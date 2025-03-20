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
  private _userId: string;
  private _courseId: string;
  private _mentorId: string;
  private _completedLessons: string[];
  private _completedMaterials: string[];
  private _isCourseCompleted: boolean;
  private _progress: number;
  private _completedDate: number | null;

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
    return this._userId;
  }

  /**
   * Gets the course's ID.
   * @readonly
   */
  get courseId(): string {
    return this._courseId;
  }
  /**
   * Gets the course's ID.
   * @readonly
   */
  get mentorId(): string {
    return this._mentorId;
  }

  /**
   * Gets the list of completed lessons.
   * @readonly
   */
  get completedLessons(): string[] {
    return this._completedLessons;
  }

  /**
   * Gets the list of completed materials.
   * @readonly
   */
  get completedMaterials(): string[] {
    return this._completedMaterials;
  }

  /**
   * Checks if the course is completed.
   * @readonly
   */
  get isCourseCompleted(): boolean {
    return this._isCourseCompleted;
  }

  /**
   * Gets the progress percentage.
   * @readonly
   */
  get progress(): number {
    return this._progress;
  }

  /**
   * Gets the course's completion date.
   * @readonly
   */
  get completedDate(): number | null {
    return this._completedDate;
  }

  /**
   * Creates an instance of ProgressEntity.
   *
   * @constructor
   * @param {ProgressInterface} props - The properties of the progress.
   */
  constructor(props: ProgressInterface) {
    this._userId = props.userId;
    this._courseId = props.courseId;
    this._mentorId = props.mentorId;
    this._completedLessons = props.completedLessons;
    this._completedMaterials = props.completedMaterials;
    this._isCourseCompleted = props.isCourseCompleted;
    this._progress = props.progress;
    this._completedDate = props.completedDate;
  }
}
