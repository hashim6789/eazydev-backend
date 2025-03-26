/**
 * Interface representing the structure of a certificate.
 *
 * @interface
 */
export interface CertificateInterface {
  progressId: string;
  courseId: string;
  mentorId: string;
  learnerId: string;
  issueDate: number;
}

/**
 * Class representing a certificate.
 *
 * @class
 */
export class CertificateEntity {
  private _progressId: string;
  private _courseId: string;
  private _mentorId: string;
  private _learnerId: string;
  private _issueDate: number;

  /**
   * Creates a new certificate instance.
   *
   * @static
   * @param {CertificateInterface} data - The data to create a certificate.
   * @returns {CertificateEntity} The created certificate instance.
   */
  static create(data: CertificateInterface): CertificateEntity {
    return new CertificateEntity(data);
  }

  /**
   * Updates the certificate instance with the provided data.
   *
   * @param {Partial<CertificateInterface>} updatedData - The data to update the certificate.
   */
  update(updatedData: Partial<CertificateInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the certificate's progress ID.
   * @readonly
   */
  get progressId(): string {
    return this._progressId;
  }

  /**
   * Gets the certificate's course ID.
   * @readonly
   */
  get courseId(): string {
    return this._courseId;
  }

  /**
   * Gets the certificate's mentor ID.
   * @readonly
   */
  get mentorId(): string {
    return this._mentorId;
  }

  /**
   * Gets the certificate's learner ID.
   * @readonly
   */
  get learnerId(): string {
    return this._learnerId;
  }

  /**
   * Gets the certificate's issue date.
   * @readonly
   */
  get issueDate(): number {
    return this._issueDate;
  }

  /**
   * Creates an instance of CertificateEntity.
   *
   * @constructor
   * @param {CertificateInterface} props - The properties of the certificate.
   */
  constructor(props: CertificateInterface) {
    this._progressId = props.progressId;
    this._courseId = props.courseId;
    this._mentorId = props.mentorId;
    this._learnerId = props.learnerId;
    this._issueDate = props.issueDate;
  }
}
