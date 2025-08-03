import { Model } from "mongoose";
import dayjs from "dayjs";

import { TokenDTO } from "../../../domain/dtos/auth/refresh-token-dto";
import { Role } from "../../../domain/types/user";
import { IToken } from "../../databases/interfaces";
import { TokenType } from "../../../domain/types";
import { ITokenRepository } from "../interfaces";

/**
 * Mongoose implementation of the refresh token repository.
 *
 * @class
 * @implements {ITokenRepository}
 */
export class TokenRepository implements ITokenRepository {
  private model: Model<IToken>;

  /**
   * Creates an instance of TokenMongooseRepository.
   *
   * @constructor
   * @param {Model<Document>} refreshTokenModel - The Mongoose model instance.
   */
  constructor(model: Model<IToken>) {
    this.model = model;
  }

  /**
   * Creates a new refresh token for the specified user.
   *
   * @async
   * @param {string} userId - The ID of the user for whom the refresh token is created.
   * @returns {Promise<TokenDTO>} The generated refresh token.
   */
  async create(
    userId: string,
    role: Role = "learner",
    type: TokenType
  ): Promise<TokenDTO> {
    const expiresIn = dayjs().add(2, "hour").unix();

    const generateToken = new this.model({
      userId,
      type,
      expiresIn,
      role,
    });
    await generateToken.save();

    return {
      id: generateToken._id.toString(),
      userId: generateToken.userId.toString(),
      type,
      expiresIn: generateToken.expiresIn,
      createdAt: generateToken.createdAt,
      role: generateToken.role,
    };
  }

  /**
   * Finds a refresh token by its ID.
   *
   * @async
   * @param {string} refreshToken - The ID of the refresh token to find.
   * @returns {Promise<TokenDTO | unknown>} The found refresh token or undefined.
   */
  async findById(refreshToken: string): Promise<TokenDTO | unknown> {
    const token = await this.model.findById(refreshToken).exec();

    return token;
  }

  /**
   * Finds a refresh token by user ID.
   *
   * @async
   * @param {string} userId - The ID of the user for whom to find the refresh token.
   * @returns {Promise<TokenDTO | unknown>} The found refresh token or undefined.
   67cbcfce051ab2ea1b7a2125
  */
  async findByUserIdAndType(
    userId: string,
    type: TokenType
  ): Promise<TokenDTO | unknown> {
    const token = await this.model.findOne({ userId, type }).exec();

    return token;
  }

  /**
   * Deletes a refresh token associated with the specified user ID.
   *
   * @async
   * @param {string} userId - The ID of the user for whom to delete the refresh token.
   * @returns {Promise<void>} A Promise that resolves once the refresh token is deleted.
   */
  async delete(userId: string): Promise<void> {
    await this.model.deleteOne({ userId }).exec();
  }
  /**
   * Deletes a refresh token associated with the specified token ID.
   *
   * @async
   * @param {string} userId - The ID of the user for whom to delete the refresh token.
   * @returns {Promise<void>} A Promise that resolves once the refresh token is deleted.
   */
  async deleteById(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
