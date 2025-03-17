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
  private _title: string;
  private _mentorId: string;
  private _categoryId: string;
  private _description: string | undefined;
  private _thumbnail: string;
  private _lessons: string[];
  private _price: number;
  private _status: CourseStatus;

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
  update(updatedData: Partial<CourseInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the course's title.
   * @readonly
   */
  get title(): string {
    return this._title;
  }

  /**
   * Gets the course's mentor ID.
   * @readonly
   */
  get mentorId(): string {
    return this._mentorId;
  }

  /**
   * Gets the course's category ID.
   * @readonly
   */
  get categoryId(): string {
    return this._categoryId;
  }

  /**
   * Gets the course's description.
   * @readonly
   */
  get description(): string | undefined {
    return this._description;
  }

  /**
   * Gets the course's thumbnail.
   * @readonly
   */
  get thumbnail(): string {
    return this._thumbnail;
  }

  /**
   * Gets the course's lessons.
   * @readonly
   */
  get lessons(): string[] {
    return this._lessons;
  }

  /**
   * Gets the course's price.
   * @readonly
   */
  get price(): number {
    return this._price;
  }

  /**
   * Gets the course's status.
   * @readonly
   */
  get status(): CourseStatus {
    return this._status;
  }

  /**
   * Creates an instance of CourseEntity.
   *
   * @constructor
   * @param {CourseInterface} props - The properties of the course.
   */
  constructor(props: CourseInterface) {
    this._title = props.title;
    this._mentorId = props.mentorId;
    this._categoryId = props.categoryId;
    this._description = props.description;
    this._thumbnail = props.thumbnail;
    this._lessons = props.lessons;
    this._price = props.price;
    this._status = props.status;
  }
}
