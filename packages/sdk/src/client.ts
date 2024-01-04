import { getQueryStringVariation } from ".";
import { IAssignmentEvent, IAssignmentLogger } from "./assignment/assignment-logger";
import { IAssignment, IAssignmentPositive } from "./assignment/assignment-result";
import { getAssignedIndex, getBucketRanges } from "./assignment/bucket";
import { getHash } from "./assignment/hashing";
import { IExperimentDefinition } from "./dto/experiment-definition";
import { IStore } from "./store/store";
import { stringify } from "./utils";

declare global {
  interface Window {
    EXPERIMENT?: Client;
  }
}

export class Client {
  private logger?: IAssignmentLogger;

  constructor(private readonly store: IStore) {
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      window.EXPERIMENT = this;
    }
  }

  public getExperiments() {
    return this.store.experiments.getEntries();
  }

  public setExperiments(experiments: Record<string, IExperimentDefinition>) {
    this.store.experiments.setEntries(experiments);
  }

  public getAttributes() {
    return this.store.attributes.getEntries();
  }

  public setAttributes(attributes: Record<string, unknown>) {
    this.store.attributes.setEntries(attributes);
  }

  public setAssignmentLogger(logger?: IAssignmentLogger) {
    this.logger = logger;
  }

  public getForcedVariations() {
    this.store.forcedVariations.getEntries();
  }

  public setForcedVariations(experimentKey: string, variationKey: string) {
    this.store.forcedVariations.set(experimentKey, variationKey);
  }

  public getAssignment(experimentKey: string): IAssignment {
    // Exclude if experiment has no key
    if (experimentKey === null || experimentKey === undefined || experimentKey === "") {
      return {
        inExperiment: false,
        experimentKey,
        reason: "experiment has no key",
      };
    }

    // Get experiment from storage
    const experiment = this.store.experiments.get(experimentKey);
    if (!experiment) {
      return {
        inExperiment: false,
        experimentKey,
        reason: "experiment not found",
      };
    }

    // If experiment has no variations, return immediately
    if (!experiment.variations) {
      return {
        inExperiment: false,
        experimentKey,
        reason: "experiment has no variations",
      };
    }

    // If experiment has less than 2 variations, return immediately
    const variationCount = experiment.variations.length;
    if (variationCount < 2) {
      return {
        inExperiment: false,
        experimentKey,
        reason: "experiment has less than 2 variations",
      };
    }

    // If variation is forced in query string, return forced variation
    const url = typeof window !== "undefined" ? window.location?.href : undefined;
    const queryStringVariation = getQueryStringVariation(url, experimentKey);
    if (queryStringVariation !== null) {
      const variationIndex = experiment.variations.indexOf(queryStringVariation);
      if (variationIndex >= 0) {
        return {
          inExperiment: true,
          experimentKey,
          variationKey: queryStringVariation,
          reason: "query string variation found",
        };
      } else {
        return { inExperiment: false, experimentKey, reason: "query string variation not found" };
      }
    }

    // If variation is forced, return forced variation
    const forcedVariation = this.store.forcedVariations.get(experimentKey);
    if (forcedVariation) {
      const variationIndex = experiment.variations.indexOf(forcedVariation);
      if (variationIndex >= 0) {
        return { inExperiment: true, experimentKey, variationKey: forcedVariation, reason: "forced variation found" };
      } else {
        return { inExperiment: false, experimentKey, reason: "forced variation not found" };
      }
    }

    // Exclude if experiment has no subject attribute
    const subjectAttribute = experiment.attribute;
    if (subjectAttribute === null || subjectAttribute === undefined) {
      return {
        inExperiment: false,
        experimentKey,
        reason: "experiment has no subject attribute",
      };
    }

    // Exclude if subject has no attribute value
    const subjectKey = this.store.attributes.get(subjectAttribute);
    if (subjectKey === null || subjectKey === undefined) {
      return {
        inExperiment: false,
        experimentKey,
        reason: "subject has no subject key",
      };
    }

    // Get bucket ranges and choose assigned variation
    const ranges = getBucketRanges(variationCount, experiment.traffic, experiment.weights);
    const hash = getHash(experimentKey, subjectKey);
    const assigned = getAssignedIndex(hash, ranges);
    if (assigned < 0 || assigned >= variationCount) {
      return {
        inExperiment: false,
        experimentKey,
        reason: "subject isn't assigned to the experiment",
      };
    }

    // Return assigned variation
    const variationKey = experiment.variations[assigned];
    const result: IAssignmentPositive = {
      inExperiment: true,
      experimentKey,
      variationKey,
      hash,
      reason: "subject assigned to the experiment",
    };

    // Track assignment
    this.trackAssignment({
      experimentKey,
      variationKey,
      subjectAttribute,
      subjectKey,
      timestamp: new Date().toISOString(),
    });

    return result;
  }

  public trackAssignment(event: IAssignmentEvent) {
    if (!this.logger) {
      return;
    }

    const trackingKey = getTrackingKey(event);

    // Make sure a tracking callback is only fired once per unique experiment
    if (this.store.assignments.has(trackingKey)) {
      return;
    }

    this.store.assignments.set(trackingKey, event.variationKey);

    this.logger(event);
  }
}

function getTrackingKey(props: IAssignmentEvent): string {
  const { experimentKey, variationKey, subjectAttribute, subjectKey } = props;

  return [experimentKey, variationKey, stringify(subjectAttribute), subjectKey].filter((value) => !!value).join(":");
}
