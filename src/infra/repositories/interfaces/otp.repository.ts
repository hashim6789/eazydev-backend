import { OtpDTO } from "../../../domain/dtos/auth/otp-auth-dto";

export interface IOtpRepository {
  create(userId: string, otp: string): Promise<OtpDTO>;
  findByUserId(userId: string): Promise<OtpDTO | unknown>;
  delete(userId: string): Promise<void>;
}
