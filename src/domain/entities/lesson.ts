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
  private __title: string;
  private __mentorId: string;
  private __description: string;
  private __materials: string[];

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
    return this.__title;
  }

  /**
   * Gets the lesson's mentor ID.
   * @readonly
   */
  get mentorId(): string {
    return this.__mentorId;
  }

  /**
   * Gets the lesson's description.
   * @readonly
   */
  get description(): string {
    return this.__description;
  }

  /**
   * Gets the lesson's lessons.
   * @readonly
   */
  get materials(): string[] {
    return this.__materials;
  }

  /**
   * Creates an instance of LessonEntity.
   *
   * @constructor
   * @param {LessonInterface} props - The properties of the lesson.
   */
  constructor(props: LessonInterface) {
    this.__title = props.title;
    this.__mentorId = props.mentorId;
    this.__description = props.description;
    this.__materials = props.materials;
  }
}
