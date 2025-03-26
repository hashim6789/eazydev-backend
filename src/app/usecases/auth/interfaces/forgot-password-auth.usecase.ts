import { IForgotPasswordRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IForgotPasswordUseCase {
  execute(data: IForgotPasswordRequestDTO): Promise<ResponseDTO>;
}
