/**
 * Interface representing the structure of a purchase.
 *
 * @interface
 */
export interface PurchaseInterface {
  learnerId: string;
  purchaseId: string;
  courseId: string;
  purchaseDate: number;
  paymentIntentId: string;
  amount: number;
  status: string;
}

/**
 * Class representing a purchase.
 *
 * @class
 */
export class PurchaseEntity {
  private _learnerId: string;
  private _purchaseId: string;
  private _courseId: string;
  private _purchaseDate: number;
  private _amount: number;
  private _paymentIntentId: string;
  private _status: string;

  /**
   * Creates a new purchase instance.
   *
   * @static
   * @param {PurchaseInterface} data - The data to create a purchase.
   * @returns {PurchaseEntity} The created purchase instance.
   */
  static create(data: PurchaseInterface): PurchaseEntity {
    return new PurchaseEntity(data);
  }

  /**
   * Updates the purchase instance with the provided data.
   *
   * @param {Partial<PurchaseInterface>} updatedData - The data to update the purchase.
   */
  update(updatedData: Partial<PurchaseInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the purchase title.
   * @readonly
   */
  get learnerId(): string {
    return this._learnerId;
  }
  /**
   * Gets the purchase title.
   * @readonly
   */
  get purchaseId(): string {
    return this._purchaseId;
  }

  /**
   * Gets the purchase message.
   * @readonly
   */
  get courseId(): string {
    return this._courseId;
  }

  /**
   * Gets the purchase recipient ID.
   * @readonly
   */
  get purchaseDate(): number {
    return this._purchaseDate;
  }

  /**
   * Gets the purchase creation date.
   * @readonly
   */
  get paymentIntentId(): string {
    return this._paymentIntentId;
  }
  /**
   * Gets the purchase creation date.
   * @readonly
   */
  get amount(): number {
    return this._amount;
  }
  /**
   * Gets the purchase creation date.
   * @readonly
   */
  get status(): string {
    return this._status;
  }

  /**
   * Creates an instance of PurchaseEntity.
   *
   * @constructor
   * @param {PurchaseInterface} props - The properties of the purchase.
   */
  constructor(props: PurchaseInterface) {
    // this._id = props.id;
    this._learnerId = props.learnerId;
    this._purchaseId = props.purchaseId;
    this._courseId = props.courseId;
    this._paymentIntentId = props.paymentIntentId;
    this._purchaseDate = props.purchaseDate;
    this._status = props.status;
    this._amount = props.amount;
  }
}
