import { sign } from "jsonwebtoken";
import { Payload } from "../../../domain/dtos/jwt-payload";
import { env } from "../../../presentation/express/configs/env.config";
import { IGenerateTokenProvider } from "../interfaces";

/**
 * Implementation of the refresh token generation provider.
 *
 * @class
 * @implements {IGenerateTokenProvider}
 */
export class GenerateTokenProvider implements IGenerateTokenProvider {
  /**
   * Generates a new refresh token based on the provided token.
   *
   * @async
   * @param {string} token - The token to use as a basis for the refresh token.
   * @returns {Promise<string>} The generated refresh token.
   * @throws {Error} Throws an error if the API_SECRET is missing in the environment variables.
   */
  async generateToken(token: string, payload: Payload): Promise<string> {
    const { userId, role } = payload;
    const secretKey = env.JWT_ACCESS_SECRET;

    if (!secretKey) {
      throw new Error("API_SECRET is missing in the environment variables.");
    }

    const generatedToken = sign({ userId, role }, secretKey, {
      subject: token,
      expiresIn: "15h",
    });

    return generatedToken;
  }
}
