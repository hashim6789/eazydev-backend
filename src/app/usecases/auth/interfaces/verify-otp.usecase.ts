import { IVerifyOtpRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IVerifyOtpUseCase {
  execute(data: IVerifyOtpRequestDTO): Promise<ResponseDTO>;
}
