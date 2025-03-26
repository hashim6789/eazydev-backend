import { IResetPasswordRequestDTO } from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IResetPasswordUseCase {
  execute(data: IResetPasswordRequestDTO): Promise<ResponseDTO>;
}
