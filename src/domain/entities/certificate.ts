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
  private __progressId: string;
  private __courseId: string;
  private __mentorId: string;
  private __learnerId: string;
  private __issueDate: number;

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

  toObject(): CertificateInterface {
    return {
      progressId: this.__progressId,
      courseId: this.__courseId,
      mentorId: this.__mentorId,
      learnerId: this.__learnerId,
      issueDate: this.__issueDate,
    };
  }

  /**
   * Gets the certificate's progress ID.
   * @readonly
   */
  get progressId(): string {
    return this.__progressId;
  }

  /**
   * Gets the certificate's course ID.
   * @readonly
   */
  get courseId(): string {
    return this.__courseId;
  }

  /**
   * Gets the certificate's mentor ID.
   * @readonly
   */
  get mentorId(): string {
    return this.__mentorId;
  }
  /**
   * Gets the certificate's mentor ID.
   * @readonly
   */
  get learnerId(): string {
    return this.__learnerId;
  }
  /**
   * Gets the certificate's mentor ID.
   * @readonly
   */
  get issueDate(): number {
    return this.__issueDate;
  }

  /**
   * Gets the certificate's learner ID.
   * @readonly{
    this.__progressId = props.progressId;
    this.__courseId = props.courseId;
    this.__mentorId = props.mentorId;
    this.__learnerId = props.learnerId;
    this.__issueDate = props.issueDate;
  }
  get issueDate(): number {
    return this.__issueDate;
  }

  /**
   * Creates an instance of CertificateEntity.
   *
   * @constructor
   * @param {CertificateInterface} props - The properties of the certificate.
   */
  constructor(props: CertificateInterface) {
    this.__progressId = props.progressId;
    this.__courseId = props.courseId;
    this.__mentorId = props.mentorId;
    this.__learnerId = props.learnerId;
    this.__issueDate = props.issueDate;
  }
}
