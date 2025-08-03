import { TokenDTO } from "../../../domain/dtos/auth/refresh-token-dto";
import { TokenType } from "../../../domain/types";
import { Role } from "../../../domain/types/user";

/**
 * Interface for the repository handling refresh tokens.
 *
 * @interface
 */
export interface ITokenRepository {
  /**
   * Creates a new refresh token for the specified user.
   *
   * @async
   * @param {string} userId - The ID of the user.
   * @returns {Promise<TokenDTO>} The created refresh token.
   */
  create(userId: string, role: Role, type: TokenType): Promise<TokenDTO>;

  /**
   * Finds a refresh token by its identifier.
   *
   * @async
   * @param {string} token - The refresh token identifier.
   * @returns {Promise<TokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  findById(token: string): Promise<TokenDTO | unknown>;

  /**
   * Finds a refresh token by the user's ID.
   *
   * @async
   * @param {string} userId - The ID of the user.
   * @returns {Promise<tTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  findByUserIdAndType(
    userId: string,
    type: TokenType
  ): Promise<TokenDTO | unknown>;

  /**
   * Deletes a refresh token associated with the specified user.
   *
   * @async
   * @param {string} userId - The ID of the user.
   * @returns {Promise<void>} A promise that resolves when the refresh token is deleted.
   */
  delete(userId: string): Promise<void>;
  deleteById(id: string): Promise<void>;
}
