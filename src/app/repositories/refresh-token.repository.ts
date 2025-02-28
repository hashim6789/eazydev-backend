import { RefreshTokenDTO } from "../../domain/dtos/auth/refresh-token-dto";
import { Role } from "../../domain/dtos/role.dtos";

/**
 * Interface for the repository handling refresh tokens.
 *
 * @interface
 */
export interface IRefreshTokenRepository {
  /**
   * Creates a new refresh token for the specified user.
   *
   * @async
   * @param {string} userId - The ID of the user.
   * @returns {Promise<RefreshTokenDTO>} The created refresh token.
   */
  create(userId: string, role: Role): Promise<RefreshTokenDTO>;

  /**
   * Finds a refresh token by its identifier.
   *
   * @async
   * @param {string} refreshToken - The refresh token identifier.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  findById(refreshToken: string): Promise<RefreshTokenDTO | unknown>;

  /**
   * Finds a refresh token by the user's ID.
   *
   * @async
   * @param {string} userId - The ID of the user.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  findByUserId(userId: string): Promise<RefreshTokenDTO | unknown>;

  /**
   * Deletes a refresh token associated with the specified user.
   *
   * @async
   * @param {string} userId - The ID of the user.
   * @returns {Promise<void>} A promise that resolves when the refresh token is deleted.
   */
  delete(userId: string): Promise<void>;
}
