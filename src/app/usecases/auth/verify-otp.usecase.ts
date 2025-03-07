import { ResponseDTO } from "../../../domain/dtos/response.dtos";

export interface IVerifyOtpUseCase {
  execute(data: IVerifyOtpRequestDTO): Promise<ResponseDTO>;
}
