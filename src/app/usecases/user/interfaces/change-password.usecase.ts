import { ResponseDTO } from "../../../../domain/dtos/response";
import { IChangePasswordRequestDTO, Payload } from "../../../../domain/dtos";

export interface IChangePasswordUseCase {
  execute(
    data: IChangePasswordRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
