/**
 * Interface representing the structure of a chat group.
 *
 * @interface
 */
export interface ChatGroup {
  course: string;
  mentor: string;
  learners: string[];
  createdAt: number;
}

/**
 * Class representing a chat group entity.
 *
 * @class
 */
export class ChatGroupEntity {
  private __course: string;
  private __mentor: string;
  private __learners: string[];
  private __createdAt: number;

  /**
   * Creates a new chat group instance.
   *
   * @static
   * @param {IChatGroup} data - The data to create a chat group.
   * @returns {ChatGroupEntity} The created chat group instance.
   */
  static create(data: ChatGroup): ChatGroupEntity {
    return new ChatGroupEntity(data);
  }

  /**
   * Updates the chat group with the provided data.
   *
   * @param {Partial<IChatGroup>} updatedData - The data to update the chat group.
   */
  update(updatedData: Partial<ChatGroup>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the associated course ID.
   * @readonly
   */
  get course(): string {
    return this.__course;
  }

  /**
   * Gets the mentor ID.
   * @readonly
   */
  get mentor(): string {
    return this.__mentor;
  }

  /**
   * Gets the learners' IDs.
   * @readonly
   */
  get learners(): string[] {
    return this.__learners;
  }

  /**
   * Gets the date when the chat group was created.
   * @readonly
   */
  get createdAt(): number {
    return this.__createdAt;
  }

  /**
   * Creates an instance of ChatGroupEntity.
   *
   * @constructor
   * @param {IChatGroup} props - The properties of the chat group.
   */
  constructor(props: ChatGroup) {
    this.__course = props.course;
    this.__mentor = props.mentor;
    this.__learners = props.learners;
    this.__createdAt = props.createdAt;
  }
}
