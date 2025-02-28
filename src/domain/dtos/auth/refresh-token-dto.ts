import { Role } from "../role.dtos";

/**
 * Data Transfer Object (DTO) representing a refresh token.
 *
 * @interface
 */
export interface RefreshTokenDTO {
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

  role: Role;

  /**
   * The creation timestamp of the refresh token.
   */
  createdAt: Date;
}
