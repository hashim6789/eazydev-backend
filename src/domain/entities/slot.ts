/**
 * Interface representing the structure of a slot.
 *
 * @interface
 */
export interface SlotInterface {
  mentorId: string;
  time: number;
  isBooked: boolean;
}

/**
 * Class representing a slot.
 *
 * @class
 */
export class SlotEntity {
  private _mentorId: string;
  private _time: number;
  private _isBooked: boolean;

  /**
   * Creates a new slot instance.
   *
   * @static
   * @param {SlotInterface} data - The data to create a slot.
   * @returns {SlotEntity} The created slot instance.
   */
  static create(data: SlotInterface): SlotEntity {
    return new SlotEntity(data);
  }

  /**
   * Updates the slot instance with the provided data.
   *
   * @param {Partial<SlotInterface>} updatedData - The data to update the slot.
   */
  update(updatedData: Partial<SlotInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the mentor ID for the slot.
   * @readonly
   */
  get mentorId(): string {
    return this._mentorId;
  }

  /**
   * Gets the time of the slot.
   * @readonly
   */
  get time(): number {
    return this._time;
  }

  /**
   * Checks if the slot is booked.
   * @readonly
   */
  get isBooked(): boolean {
    return this._isBooked;
  }

  /**
   * Creates an instance of SlotEntity.
   *
   * @constructor
   * @param {SlotInterface} props - The properties of the slot.
   */
  constructor(props: SlotInterface) {
    this._mentorId = props.mentorId;
    this._time = props.time;
    this._isBooked = props.isBooked;
  }
}
