/**
 * Enum representing error types related to otp operations.
 *
 * @enum
 */
export enum OtpErrorType {
  /**
   * Error type indicating that the otp does not exist.
   */
  OtpDoesNotExist = "Otp does not exist!",

  /**
   * Error type indicating that no otp were found.
   */
  OtpNotFound = "Otp not found",

  /**
   * Error type indicating the otp is expired.
   */
  OtpExpired = "The otp is expired!",

  /**
   * Error type indicating the otp is not verified.
   */
  OtpNotVerified = "Otp is not verified!",

  /**
   * Error type indicating the otp is not verified.
   */
  OtpNotValid = "The otp is not valid!",
  /**
   * Error type indicating the otp can't be created.
   */
  OtpCantCreate = "Otp can't be created!",
  /**
   * Error type indicating the otp can't be created.
   */
  OtpVerifySuccess = "The otp is verified successfully",
}
