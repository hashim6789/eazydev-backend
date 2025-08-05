import { Model } from "mongoose";
import dayjs from "dayjs";

import { TokenDTO } from "../../../domain/dtos/auth/refresh-token-dto";
import { Role } from "../../../domain/types/user";
import { IToken } from "../../databases/interfaces";
import { TokenType } from "../../../domain/types";
import { ITokenRepository } from "../interfaces";

export class TokenRepository implements ITokenRepository {
  private _model: Model<IToken>;

  constructor(model: Model<IToken>) {
    this._model = model;
  }

  async create(
    userId: string,
    role: Role = "learner",
    type: TokenType
  ): Promise<TokenDTO> {
    const expiresIn = dayjs().add(2, "hour").unix();

    const generateToken = new this._model({
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

  async findById(refreshToken: string): Promise<TokenDTO | unknown> {
    const token = await this._model.findById(refreshToken).exec();

    return token;
  }

  async findByUserIdAndType(
    userId: string,
    type: TokenType
  ): Promise<TokenDTO | unknown> {
    const token = await this._model.findOne({ userId, type }).exec();

    return token;
  }

  async delete(userId: string): Promise<void> {
    await this._model.deleteOne({ userId }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id).exec();
  }
}
