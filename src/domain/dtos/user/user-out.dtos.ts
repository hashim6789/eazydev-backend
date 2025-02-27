/**
 * Data Transfer Object (DTO) representing the output user data.
 *
 * @interface
 */
export interface IUserOutRequestDTO {
  /**
   * The ID of the user.
   */
  id: string;

  /**
   * The name of the user.
   */
  firstName: string;
  /**
   * The name of the user.
   */
  lastName: string;

  /**
   * The email address of the user.
   */
  email: string;

  /**
   * The optional creation date of the user account.
   */
  createdAt?: Date;
}
