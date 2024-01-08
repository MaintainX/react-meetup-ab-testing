import { IExperimentDefinition } from "../dto";
import { InMemoryCache } from "./in-memory-cache";
import { IStore } from "./store";

export class InMemoryStore implements IStore {
  constructor(
    public readonly attributes = new InMemoryCache<unknown>(),
    public readonly assignments = new InMemoryCache<string>(),
    public readonly experiments = new InMemoryCache<IExperimentDefinition>(),
    public readonly forcedVariations = new InMemoryCache<string>()
  ) {}
}
