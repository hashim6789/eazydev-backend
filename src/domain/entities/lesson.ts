/**
 * Interface representing the structure of a lesson.
 *
 * @interface
 */
export interface LessonInterface {
  title: string;
  mentorId: string;
  description: string;
  materials: string[];
}

/**
 * Class representing a lesson.
 *
 * @class
 */
export class LessonEntity {
  private _title: string;
  private _mentorId: string;
  private _description: string;
  private _materials: string[];

  /**
   * Creates a new lesson instance.
   *
   * @static
   * @param {LessonInterface} data - The data to create a lesson.
   * @returns {LessonEntity} The created lesson instance.
   */
  static create(data: LessonInterface): LessonEntity {
    return new LessonEntity(data);
  }

  /**
   * Updates the lesson instance with the provided data.
   *
   * @param {Partial<LessonInterface>} updatedData - The data to update the lesson.
   */
  update(updatedData: Partial<LessonInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the lesson's title.
   * @readonly
   */
  get title(): string {
    return this._title;
  }

  /**
   * Gets the lesson's mentor ID.
   * @readonly
   */
  get mentorId(): string {
    return this._mentorId;
  }

  /**
   * Gets the lesson's description.
   * @readonly
   */
  get description(): string {
    return this._description;
  }

  /**
   * Gets the lesson's lessons.
   * @readonly
   */
  get materials(): string[] {
    return this._materials;
  }

  /**
   * Creates an instance of LessonEntity.
   *
   * @constructor
   * @param {LessonInterface} props - The properties of the lesson.
   */
  constructor(props: LessonInterface) {
    this._title = props.title;
    this._mentorId = props.mentorId;
    this._description = props.description;
    this._materials = props.materials;
  }
}
