import { OtpDTO } from "../../../domain/dtos/auth/otp-auth-dto";
import { IOtp } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";

export interface IOtpRepository extends IBaseRepository<IOtp> {
  // create(userId: string, otp: string): Promise<OtpDTO>;
  findByUserId(userId: string): Promise<OtpDTO | unknown>;
  // delete(userId: string): Promise<void>;
}
