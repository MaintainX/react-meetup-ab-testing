export interface IAssignmentEvent {
  /**
   * The experiment key
   */
  experimentKey: string;

  /**
   * The assigned variation
   */
  variationKey: string;

  /**
   * The subject attribute used to assign the variation
   */
  subjectAttribute: string;

  /**
   * The entity or user that was assigned to a variation
   */
  subjectKey: unknown;

  /**
   * The time the subject was exposed to the variation.
   */
  timestamp: string;
}

export type IAssignmentLogger = (event: IAssignmentEvent) => void;
