import { CourseStatus } from "../types";

/**
 * Interface representing the structure of a course.
 *
 * @interface
 */
export interface CourseInterface {
  title: string;
  mentorId: string;
  categoryId: string;
  description: string | undefined;
  thumbnail: string;
  lessons: string[];
  price: number;
  status: CourseStatus;
}

/**
 * Class representing a course.
 *
 * @class
 */
export class CourseEntity {
  private __title: string;
  private __mentorId: string;
  private __categoryId: string;
  private __description: string | undefined;
  private __thumbnail: string;
  private __lessons: string[];
  private __price: number;
  private __status: CourseStatus;

  /**
   * Creates a new course instance.
   *
   * @static
   * @param {CourseInterface} data - The data to create a course.
   * @returns {CourseEntity} The created course instance.
   */
  static create(data: CourseInterface): CourseEntity {
    return new CourseEntity(data);
  }

  /**
   * Updates the course instance with the provided data.
   *
   * @param {Partial<CourseInterface>} updatedData - The data to update the course.
   */
  static update(updatedData: Partial<CourseInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the course's title.
   * @readonly
   */
  get title(): string {
    return this.__title;
  }

  /**
   * Gets the course's mentor ID.
   * @readonly
   */
  get mentorId(): string {
    return this.__mentorId;
  }

  /**
   * Gets the course's category ID.
   * @readonly
   */
  get categoryId(): string {
    return this.__categoryId;
  }

  /**
   * Gets the course's description.
   * @readonly
   */
  get description(): string | undefined {
    return this.__description;
  }

  /**
   * Gets the course's thumbnail.
   * @readonly
   */
  get thumbnail(): string {
    return this.__thumbnail;
  }

  /**
   * Gets the course's lessons.
   * @readonly
   */
  get lessons(): string[] {
    return this.__lessons;
  }

  /**
   * Gets the course's price.
   * @readonly
   */
  get price(): number {
    return this.__price;
  }

  /**
   * Gets the course's status.
   * @readonly
   */
  get status(): CourseStatus {
    return this.__status;
  }

  /**
   * Creates an instance of CourseEntity.
   *
   * @constructor
   * @param {CourseInterface} props - The properties of the course.
   */
  constructor(props: CourseInterface) {
    this.__title = props.title;
    this.__mentorId = props.mentorId;
    this.__categoryId = props.categoryId;
    this.__description = props.description;
    this.__thumbnail = props.thumbnail;
    this.__lessons = props.lessons;
    this.__price = props.price;
    this.__status = props.status;
  }
}
