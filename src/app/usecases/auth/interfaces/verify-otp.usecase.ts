import { IVerifyOtpRequestDTO } from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IVerifyOtpUseCase {
  execute(data: IVerifyOtpRequestDTO): Promise<ResponseDTO>;
}
