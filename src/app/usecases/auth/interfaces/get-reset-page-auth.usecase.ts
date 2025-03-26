import { IGetResetPageRequestDTO } from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IGetResetPageUseCase {
  execute(data: IGetResetPageRequestDTO): Promise<ResponseDTO>;
}
