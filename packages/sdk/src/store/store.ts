import { IExperimentDefinition } from "../dto/experiment-definition";
import { ICache } from "./cache";

export interface IStore {
  attributes: ICache<unknown>;
  assignments: ICache<string>;
  experiments: ICache<IExperimentDefinition>;
  forcedVariations: ICache<string>;
}
