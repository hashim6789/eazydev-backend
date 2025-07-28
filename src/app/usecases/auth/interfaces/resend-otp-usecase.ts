import { IResendOtpRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IResendOtpUseCase {
  execute(data: IResendOtpRequestDTO): Promise<ResponseDTO>;
}
