/**
 * Interface representing the structure of a meeting.
 *
 * @interface
 */
export interface MeetingInterface {
  courseId: string;
  learnerId: string;
  mentorId: string;
  roomId: string;
  slotId: string;
  mentorPeerId: string | null;
  learnerPeerId: string | null;
}

/**
 * Class representing a meeting.
 *
 * @class
 */
export class MeetingEntity {
  private __courseId: string;
  private __learnerId: string;
  private __mentorId: string;
  private __roomId: string;
  private __slotId: string;
  private __mentorPeerId: string | null;
  private __learnerPeerId: string | null;

  /**
   * Creates a new meeting instance.
   *
   * @static
   * @param {MeetingInterface} data - The data to create a meeting.
   * @returns {MeetingEntity} The created meeting instance.
   */
  static create(data: MeetingInterface): MeetingEntity {
    return new MeetingEntity(data);
  }

  /**
   * Updates the meeting instance with the provided data.
   *
   * @param {Partial<MeetingInterface>} updatedData - The data to update the meeting.
   */
  update(updatedData: Partial<MeetingInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the meeting title.
   * @readonly
   */
  get learnerId(): string {
    return this.__learnerId;
  }
  /**
   * Gets the meeting title.
   * @readonly
   */
  get mentorId(): string {
    return this.__mentorId;
  }

  /**
   * Gets the meeting message.
   * @readonly
   */
  get courseId(): string {
    return this.__courseId;
  }
  /**
   * Gets the meeting message.
   * @readonly
   */
  get slotId(): string {
    return this.__slotId;
  }

  /**
   * Gets the meeting recipient ID.
   * @readonly
   */
  get roomId(): string {
    return this.__roomId;
  }

  /**
   * Gets the meeting creation date.
   * @readonly
   */
  get mentorPeerId(): string | null {
    return this.__mentorPeerId;
  }
  /**
   * Gets the meeting creation date.
   * @readonly
   */
  get learnerPeerId(): string | null {
    return this.__learnerPeerId;
  }

  /**
   * Creates an instance of MeetingEntity.
   *
   * @constructor
   * @param {MeetingInterface} props - The properties of the meeting.
   */
  constructor(props: MeetingInterface) {
    this.__courseId = props.courseId;
    this.__learnerId = props.learnerId;
    this.__mentorId = props.mentorId;
    this.__roomId = props.roomId;
    this.__slotId = props.slotId;
    this.__mentorPeerId = props.mentorPeerId;
    this.__learnerPeerId = props.learnerPeerId;
  }
}
