/**
 * Interface representing the structure of a notification.
 *
 * @interface
 */
export interface NotificationInterface {
  title: string;
  message: string;
  recipientId: string;
  createdAt: number;
}

/**
 * Class representing a notification.
 *
 * @class
 */
export class NotificationEntity {
  private _title: string;
  private _message: string;
  private _recipientId: string;
  private _createdAt: number;

  /**
   * Creates a new notification instance.
   *
   * @static
   * @param {NotificationInterface} data - The data to create a notification.
   * @returns {NotificationEntity} The created notification instance.
   */
  static create(data: NotificationInterface): NotificationEntity {
    return new NotificationEntity(data);
  }

  /**
   * Updates the notification instance with the provided data.
   *
   * @param {Partial<NotificationInterface>} updatedData - The data to update the notification.
   */
  update(updatedData: Partial<NotificationInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the notification title.
   * @readonly
   */
  get title(): string {
    return this._title;
  }

  /**
   * Gets the notification message.
   * @readonly
   */
  get message(): string {
    return this._message;
  }

  /**
   * Gets the notification recipient ID.
   * @readonly
   */
  get recipientId(): string {
    return this._recipientId;
  }

  /**
   * Gets the notification creation date.
   * @readonly
   */
  get createdAt(): number {
    return this._createdAt;
  }

  /**
   * Creates an instance of NotificationEntity.
   *
   * @constructor
   * @param {NotificationInterface} props - The properties of the notification.
   */
  constructor(props: NotificationInterface) {
    this._title = props.title;
    this._message = props.message;
    this._recipientId = props.recipientId;
    this._createdAt = props.createdAt;
  }
}
