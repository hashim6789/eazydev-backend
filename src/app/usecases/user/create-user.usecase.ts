import { ResponseDTO } from "../../../domain/dtos/response.dtos";
import { ICreateUserRequestDTO } from "../../../domain/dtos/user/create-user.dtos";

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<ResponseDTO>;
}
