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
  private __learnerId: string;
  private __purchaseId: string;
  private __courseId: string;
  private __purchaseDate: number;
  private __amount: number;
  private __paymentIntentId: string;
  private __status: string;

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
    return this.__learnerId;
  }
  /**
   * Gets the purchase title.
   * @readonly
   */
  get purchaseId(): string {
    return this.__purchaseId;
  }

  /**
   * Gets the purchase message.
   * @readonly
   */
  get courseId(): string {
    return this.__courseId;
  }

  /**
   * Gets the purchase recipient ID.
   * @readonly
   */
  get purchaseDate(): number {
    return this.__purchaseDate;
  }

  /**
   * Gets the purchase creation date.
   * @readonly
   */
  get paymentIntentId(): string {
    return this.__paymentIntentId;
  }
  /**
   * Gets the purchase creation date.
   * @readonly
   */
  get amount(): number {
    return this.__amount;
  }
  /**
   * Gets the purchase creation date.
   * @readonly
   */
  get status(): string {
    return this.__status;
  }

  /**
   * Creates an instance of PurchaseEntity.
   *
   * @constructor
   * @param {PurchaseInterface} props - The properties of the purchase.
   */
  constructor(props: PurchaseInterface) {
    // this.__id = props.id;
    this.__learnerId = props.learnerId;
    this.__purchaseId = props.purchaseId;
    this.__courseId = props.courseId;
    this.__paymentIntentId = props.paymentIntentId;
    this.__purchaseDate = props.purchaseDate;
    this.__status = props.status;
    this.__amount = props.amount;
  }
}
