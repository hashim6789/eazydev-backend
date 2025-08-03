import { Payload } from "../../../domain/dtos/jwt-payload";
import { TokenType } from "../../../domain/types";

/**
 * Interface for the provider responsible for generating refresh tokens.
 *
 * @interface
 */
export interface IGenerateTokenProvider {
  /**
   * Generates a new refresh token based on the provided token.
   *
   * @async
   * @param {string} token - The token used as a basis for generating the refresh token.
   * @returns {Promise<string>} The generated refresh token.
   */
  generateToken(
    token: string,
    payload: Payload,
    type: TokenType
  ): Promise<string>;
}
