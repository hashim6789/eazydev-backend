import { Model, Document, Schema, model } from "mongoose";
import dayjs from "dayjs";

import { Role } from "../../domain/dtos/role.dtos";
import { IOtpRepository } from "../../app/repositories/otp.repository";
import { OtpDTO } from "../../domain/dtos/auth/otp-auth-dto";
import OtpModel from "../databases/models/otp.model";

/**
 * Mongoose implementation of the refresh token repository.
 *
 * @class
 * @implements {IOtpRepository}
 */
export class OtpRepository implements IOtpRepository {
  // private Otp: Model<Document>;

  /**
   * Creates an instance of OtpMongooseRepository.
   *
   * @constructor
   * @param {Model<Document>} refreshTokenModel - The Mongoose model instance.
   */
  // constructor(Model: Model<Document>) {
  //   this.Otp = refreshTokenModel;
  // }

  /**
   * Creates a new refresh token for the specified user.
   *
   * @async
   * @param {string} userId - The ID of the user for whom the refresh token is created.
   * @returns {Promise<OtpDTO>} The generated refresh token.
   */
  async create(userId: string, otp: string): Promise<OtpDTO> {
    const expiresIn = dayjs().add(5, "minute").unix();

    const generateOtp = new OtpModel({
      userId,
      expiresIn,
      otp,
    });
    await generateOtp.save();

    return {
      id: generateOtp._id.toString(),
      userId: generateOtp.userId.toString(),
      expiresIn: generateOtp.expiresIn,
      otp: generateOtp.otp,
    };
  }

  /**
   * Finds a refresh token by its ID.
   *
   * @async
   * @param {string} refreshToken - The ID of the refresh token to find.
   * @returns {Promise<OtpDTO | unknown>} The found refresh token or undefined.
   */
  async findById(refreshToken: string): Promise<OtpDTO | unknown> {
    const token = await OtpModel.findById(refreshToken).exec();

    return token;
  }

  /**
   * Finds a refresh token by user ID.
   *
   * @async
   * @param {string} userId - The ID of the user for whom to find the refresh token.
   * @returns {Promise<OtpDTO | unknown>} The found refresh token or undefined.
   */
  async findByUserId(userId: string): Promise<OtpDTO | unknown> {
    const token = await OtpModel.findOne({ userId }).exec();

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
    await OtpModel.deleteOne({ userId }).exec();
  }
}
