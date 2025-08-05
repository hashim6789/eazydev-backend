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
  private __title: string;
  private __message: string;
  private __recipientId: string;
  private __createdAt: number;

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
    return this.__title;
  }

  /**
   * Gets the notification message.
   * @readonly
   */
  get message(): string {
    return this.__message;
  }

  /**
   * Gets the notification recipient ID.
   * @readonly
   */
  get recipientId(): string {
    return this.__recipientId;
  }

  /**
   * Gets the notification creation date.
   * @readonly
   */
  get createdAt(): number {
    return this.__createdAt;
  }

  /**
   * Creates an instance of NotificationEntity.
   *
   * @constructor
   * @param {NotificationInterface} props - The properties of the notification.
   */
  constructor(props: NotificationInterface) {
    this.__title = props.title;
    this.__message = props.message;
    this.__recipientId = props.recipientId;
    this.__createdAt = props.createdAt;
  }
}
