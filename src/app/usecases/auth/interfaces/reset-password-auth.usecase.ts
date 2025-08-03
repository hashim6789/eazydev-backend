import { IResetPasswordRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IResetPasswordUseCase {
  execute(data: IResetPasswordRequestDTO): Promise<ResponseDTO>;
}
