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
  private _courseId: string;
  private _learnerId: string;
  private _mentorId: string;
  private _roomId: string;
  private _slotId: string;
  private _mentorPeerId: string | null;
  private _learnerPeerId: string | null;

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
    return this._learnerId;
  }
  /**
   * Gets the meeting title.
   * @readonly
   */
  get mentorId(): string {
    return this._mentorId;
  }

  /**
   * Gets the meeting message.
   * @readonly
   */
  get courseId(): string {
    return this._courseId;
  }
  /**
   * Gets the meeting message.
   * @readonly
   */
  get slotId(): string {
    return this._slotId;
  }

  /**
   * Gets the meeting recipient ID.
   * @readonly
   */
  get roomId(): string {
    return this._roomId;
  }

  /**
   * Gets the meeting creation date.
   * @readonly
   */
  get mentorPeerId(): string | null {
    return this._mentorPeerId;
  }
  /**
   * Gets the meeting creation date.
   * @readonly
   */
  get learnerPeerId(): string | null {
    return this._learnerPeerId;
  }

  /**
   * Creates an instance of MeetingEntity.
   *
   * @constructor
   * @param {MeetingInterface} props - The properties of the meeting.
   */
  constructor(props: MeetingInterface) {
    this._courseId = props.courseId;
    this._learnerId = props.learnerId;
    this._mentorId = props.mentorId;
    this._roomId = props.roomId;
    this._slotId = props.slotId;
    this._mentorPeerId = props.mentorPeerId;
    this._learnerPeerId = props.learnerPeerId;
  }
}
