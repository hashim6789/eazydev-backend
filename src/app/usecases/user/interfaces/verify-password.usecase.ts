import { ResponseDTO } from "../../../../domain/dtos/response";
import { IVerifyPasswordRequestDTO, Payload } from "../../../../domain/dtos";

export interface IVerifyPasswordUseCase {
  execute(
    data: IVerifyPasswordRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
