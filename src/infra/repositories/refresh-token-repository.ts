import { Model } from "mongoose";
import dayjs from "dayjs";

import { IRefreshTokenRepository } from "../../app/repositories/refresh-token.repository";
import { RefreshTokenDTO } from "../../domain/dtos/auth/refresh-token-dto";
import { Role } from "../../domain/types/user";
import { IRefreshToken } from "../databases/interfaces";

/**
 * Mongoose implementation of the refresh token repository.
 *
 * @class
 * @implements {IRefreshTokenRepository}
 */
export class RefreshTokenRepository implements IRefreshTokenRepository {
  private model: Model<IRefreshToken>;

  /**
   * Creates an instance of RefreshTokenMongooseRepository.
   *
   * @constructor
   * @param {Model<Document>} refreshTokenModel - The Mongoose model instance.
   */
  constructor(model: Model<IRefreshToken>) {
    this.model = model;
  }

  /**
   * Creates a new refresh token for the specified user.
   *
   * @async
   * @param {string} userId - The ID of the user for whom the refresh token is created.
   * @returns {Promise<RefreshTokenDTO>} The generated refresh token.
   */
  async create(
    userId: string,
    role: Role = "learner"
  ): Promise<RefreshTokenDTO> {
    const expiresIn = dayjs().add(2, "hour").unix();

    const generateRefreshToken = new this.model({
      userId,
      expiresIn,
      role,
    });
    await generateRefreshToken.save();

    return {
      id: generateRefreshToken._id.toString(),
      userId: generateRefreshToken.userId.toString(),
      expiresIn: generateRefreshToken.expiresIn,
      createdAt: generateRefreshToken.createdAt,
      role: generateRefreshToken.role,
    };
  }

  /**
   * Finds a refresh token by its ID.
   *
   * @async
   * @param {string} refreshToken - The ID of the refresh token to find.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token or undefined.
   */
  async findById(refreshToken: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.model.findById(refreshToken).exec();

    return token;
  }

  /**
   * Finds a refresh token by user ID.
   *
   * @async
   * @param {string} userId - The ID of the user for whom to find the refresh token.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token or undefined.
   67cbcfce051ab2ea1b7a2125
  */
  async findByUserId(userId: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.model.findOne({ userId }).exec();

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
}
