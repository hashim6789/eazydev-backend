import { ResponseDTO } from "../../../domain/dtos/response.dtos";
import { ISignupRequestDTO } from "../../../domain/dtos/auth";

export interface ISignupUseCase {
  execute(data: ISignupRequestDTO): Promise<ResponseDTO>;
}
