import { Model } from "mongoose";
import { OtpDTO } from "../../../domain/dtos/auth/otp-auth-dto";
import { IOtp } from "../../databases/interfaces";
import { IOtpRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class OtpRepository
  extends BaseRepository<IOtp>
  implements IOtpRepository
{
  constructor(model: Model<IOtp>) {
    super(model);
  }

  async findByUserId(userId: string): Promise<OtpDTO | unknown> {
    const token = await this._model.findOne({ userId }).exec();

    return token;
  }
}
