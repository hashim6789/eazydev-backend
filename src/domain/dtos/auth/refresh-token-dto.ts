import { TokenType } from "../../types";
import { Role } from "../../types/user";

/**
 * Data Transfer Object (DTO) representing a refresh token.
 *
 * @interface
 */
export interface TokenDTO {
  /**
   * The unique identifier for the refresh token.
   */
  id: string;

  /**
   * The expiration time of the refresh token (in seconds).
   */
  expiresIn: number;

  /**
   * The user ID associated with the refresh token.
   */
  userId: string;
  type: TokenType;

  role: Role;

  /**
   * The creation timestamp of the refresh token.
   */
  createdAt: Date;
}
