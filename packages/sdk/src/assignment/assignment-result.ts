/**
 * The result of an experiment assignment
 */
export type IAssignment = IAssignmentPositive | IAssignmentNegative;

/**
 * The result of an experiment assignment when the subject is in the experiment
 */
export type IAssignmentPositive = {
  /**
   * Whether the subject is in the experiment
   */
  inExperiment: true;
  /**
   * The experiment key
   */
  experimentKey: string;
  /**
   * The assigned variation
   */
  variationKey: string;
  /**
   * Hash value between 0 and 1
   */
  hash?: number;
  /**
   * Reason for being in the experiment. Helps with debugging and unit testing.
   */
  reason: string;
};

/**
 * The result of an experiment assignment when the subject is not in the experiment
 */
type IAssignmentNegative = {
  /**
   * Whether the subject is in the experiment
   */
  inExperiment: false;
  /**
   * The experiment key
   */
  experimentKey?: string;
  /**
   * Must be undefined and exists to allow for destructuring.
   */
  variationKey?: undefined;
  /**
   * Reason for not being in the experiment. Helps with debugging and unit testing.
   */
  reason: string;
};
