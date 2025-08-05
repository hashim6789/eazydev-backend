/**
 * Interface representing the structure of a chat message.
 *
 * @interface
 */
export interface ChatMessageInterface {
  group: string;
  sender: string;
  message: string;
  createdAt: number;
}

/**
 * Class representing a chat message entity.
 *
 * @class
 */
export class ChatMessageEntity {
  private __group: string;
  private __sender: string;
  private __message: string;
  private __createdAt: number;

  /**
   * Creates a new chat message instance.
   *
   * @static
   * @param {ChatMessageInterface} data - The data to create a chat message.
   * @returns {ChatMessageEntity} The created chat message instance.
   */
  static create(data: ChatMessageInterface): ChatMessageEntity {
    return new ChatMessageEntity(data);
  }

  /**
   * Updates the chat message instance with the provided data.
   *
   * @param {Partial<ChatMessageInterface>} updatedData - The data to update the chat message.
   */
  update(updatedData: Partial<ChatMessageInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the group name of the chat message.
   * @readonly
   */
  get group(): string {
    return this.__group;
  }

  /**
   * Gets the sender of the chat message.
   * @readonly
   */
  get sender(): string {
    return this.__sender;
  }

  /**
   * Gets the message content.
   * @readonly
   */
  get message(): string {
    return this.__message;
  }

  /**
   * Gets the timestamp of the chat message.
   * @readonly
   */
  get createdAt(): number {
    return this.__createdAt;
  }

  /**
   * Creates an instance of ChatMessageEntity.
   *
   * @constructor
   * @param {ChatMessageInterface} props - The properties of the chat message.
   */
  constructor(props: ChatMessageInterface) {
    this.__group = props.group;
    this.__sender = props.sender;
    this.__message = props.message;
    this.__createdAt = props.createdAt;
  }
}
