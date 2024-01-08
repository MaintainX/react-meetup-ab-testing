import { IExperimentDefinition } from "../dto";
import { ICache } from "./cache";

export interface IStore {
  attributes: ICache<unknown>;
  assignments: ICache<string>;
  experiments: ICache<IExperimentDefinition>;
  forcedVariations: ICache<string>;
}
