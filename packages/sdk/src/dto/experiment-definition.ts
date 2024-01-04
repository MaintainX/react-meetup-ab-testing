export type IExperimentDefinitions = Record<string, IExperimentDefinition>;

export interface IExperimentDefinition {
  /**
   * Unique identifier for the experiment
   * @example 'experiment-a'
   */
  key: string;

  /**
   * Property of the subject used for assignment
   * @example 'organizationId', 'userId' or 'visitorId'
   */
  attribute: string;

  /**
   * Traffic allocation for the experiment (between 0 and 1)
   * @example 0.5 for 50% of the traffic
   */
  traffic: number;

  /**
   * Variation keys of the experiment
   * @example ['control', 'treatment']
   */
  variations: string[];

  /**
   * Weights of the variations (between 0 and 1)
   * @example [0.5, 0.5] for 50% of the traffic on each variation
   */
  weights: number[];
}
