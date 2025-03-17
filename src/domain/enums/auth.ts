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
  RefreshTokenInvalid = "Refresh token is invalid!.",
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
  AuthorizationHeaderMissing = "Authorization header missing",

  /**
   * Message indicating that the authentication token is either invalid or expired.
   */
  TokenInvalidOrExpired = "Token invalid or expired",
}
