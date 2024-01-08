import { IAssignmentLogger } from "./assignment";
import { Client } from "./client";
import { IExperimentDefinition } from "./dto";
import { IStore, InMemoryStore } from "./store";

export interface ISdkConfig {
  /**
   * Url to fetch the experiment definitions from the server
   */
  url: string;
  /**
   * Pass a logging implementation to send variation assignments to your data warehouse or tracking software
   */
  assignmentLogger?: IAssignmentLogger;
  /**
   * Subject attributes used for assignment
   */
  attributes?: Record<string, unknown>;
}

const store: IStore = new InMemoryStore();

const instance: Client = new Client(store);

/**
 * Used to access a singleton SDK client instance.
 * Use the method after calling init() to initialize the client.
 */
export function getInstance(): Client {
  return instance;
}

/**
 * Initializes the SDK client.
 */
export async function init(config: ISdkConfig) {
  const experiments = await fetchExperiments(config.url);

  instance.setExperiments(experiments);

  if (config.assignmentLogger) {
    instance.setAssignmentLogger(config.assignmentLogger);
  }

  if (config.attributes) {
    instance.setAttributes(config.attributes);
  }

  return instance;
}

async function fetchExperiments(url: string) {
  const response = await fetch(url);

  const data = await response.json();

  return data as Record<string, IExperimentDefinition>;
}
