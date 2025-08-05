/**
 * Interface representing the structure of progress.
 *
 * @interface
 */
export interface ProgressInterface {
  userId: string;
  courseId: string;
  mentorId: string;
  completedLessons: string[];
  completedMaterials: string[];
  isCourseCompleted: boolean;
  progress: number;
  completedDate: number | null;
}

/**
 * Class representing progress.
 *
 * @class
 */
export class ProgressEntity {
  private __userId: string;
  private __courseId: string;
  private __mentorId: string;
  private __completedLessons: string[];
  private __completedMaterials: string[];
  private __isCourseCompleted: boolean;
  private __progress: number;
  private __completedDate: number | null;

  /**
   * Creates a new progress instance.
   *
   * @static
   * @param {ProgressInterface} data - The data to create progress.
   * @returns {ProgressEntity} The created progress instance.
   */
  static create(data: ProgressInterface): ProgressEntity {
    return new ProgressEntity(data);
  }

  /**
   * Updates the progress instance with the provided data.
   *
   * @param {Partial<ProgressInterface>} updatedData - The data to update progress.
   */
  update(updatedData: Partial<ProgressInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the user's ID.
   * @readonly
   */
  get userId(): string {
    return this.__userId;
  }

  /**
   * Gets the course's ID.
   * @readonly
   */
  get courseId(): string {
    return this.__courseId;
  }
  /**
   * Gets the course's ID.
   * @readonly
   */
  get mentorId(): string {
    return this.__mentorId;
  }

  /**
   * Gets the list of completed lessons.
   * @readonly
   */
  get completedLessons(): string[] {
    return this.__completedLessons;
  }

  /**
   * Gets the list of completed materials.
   * @readonly
   */
  get completedMaterials(): string[] {
    return this.__completedMaterials;
  }

  /**
   * Checks if the course is completed.
   * @readonly
   */
  get isCourseCompleted(): boolean {
    return this.__isCourseCompleted;
  }

  /**
   * Gets the progress percentage.
   * @readonly
   */
  get progress(): number {
    return this.__progress;
  }

  /**
   * Gets the course's completion date.
   * @readonly
   */
  get completedDate(): number | null {
    return this.__completedDate;
  }

  /**
   * Creates an instance of ProgressEntity.
   *
   * @constructor
   * @param {ProgressInterface} props - The properties of the progress.
   */
  constructor(props: ProgressInterface) {
    this.__userId = props.userId;
    this.__courseId = props.courseId;
    this.__mentorId = props.mentorId;
    this.__completedLessons = props.completedLessons;
    this.__completedMaterials = props.completedMaterials;
    this.__isCourseCompleted = props.isCourseCompleted;
    this.__progress = props.progress;
    this.__completedDate = props.completedDate;
  }
}
