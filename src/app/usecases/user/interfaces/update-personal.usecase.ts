import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO, authData:Payload): Promise<ResponseDTO>;
}
