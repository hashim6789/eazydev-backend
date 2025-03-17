import { IResendOtpRequestDTO } from "../../../domain/dtos/auth/resend-otp-auth.dto";
import { ResponseDTO } from "../../../domain/dtos/response";

export interface IResendOtpUseCase {
  execute(data: IResendOtpRequestDTO): Promise<ResponseDTO>;
}
