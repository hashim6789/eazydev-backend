/**
 * Enum representing error types related to user operations.
 *
 * @enum
 */
export enum UserErrorType {
  /**
   * Error type indicating that the user already exists.
   */
  UserAlreadyExists = "User already exists!",

  /**
   * Error type indicating that the user does not exist.
   */
  UserDoesNotExist = "User does not exist!",

  /**
   * Error type indicating that no users were found.
   */
  UserNotFound = "Users not found",

  /**
   * Error type indicating the users is blocked.
   */
  UserBlocked = "Users is blocked!",

  /**
   * Error type indicating the users is blocked.
   */
  UserNotVerified = "Users is not verified!",

  /**
   * Error type indicating the users is blocked.
   */
  UserCantCreate = "User can't be created!",

  /**
   * Error type indicating the users is blocked.
   */
  UserCantUpdate = "User can't be update!",
}
