/**
 * Enum representing error types related to user authentication.
 *
 * @enum
 */
export enum AuthenticateUserErrorType {
  /**
   * Error type indicating that the provided email or password is incorrect.
   */
  EmailOrPasswordWrong = "Email or password incorrect.",
  UserNotVerifiedOrBlocked = "User is not verified or blocked.",
  UserCanNotDoIt = "User is not access to do this activity!",
  TokenInvalid = " token is invalid!.",
  PasswordNotValid = " the current password is not valid!.",
  INVALID_EMAIL = "Invalid email format",
  INVALID_PASSWORD_LENGTH = "Password must be at least 8 characters",
  INVALID_CREDENTIAL_LENGTH = "Credential length is invalid!",
}

/**
 * Enum representing messages related to authentication.
 *
 * @enum
 */
export enum AuthMessages {
  /**
   * Message indicating that the Authorization header is missing in the request.
   */
  RefreshTokenMissing = "Refresh Token missing",
  AuthorizationHeaderMissing = "Authorization header missing",

  /**
   * Message indicating that the authentication token is either invalid or expired.
   */
  RefreshTokenInvalidOrExpired = "Refresh Token invalid or expired",
  TokenInvalidOrExpired = "Token invalid or expired",
}

export enum RoleTypes {
  ADMIN = "admin",
  MENTOR = "mentor",
  LEARNER = "learner",
}

export enum CommonErrorMessages {
  INVALID_OBJECTID = "Invalid MongoDB ObjectId",
}
