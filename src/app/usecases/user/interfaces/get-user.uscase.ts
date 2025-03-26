import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetUserRequestDTO } from "../../../../domain/dtos";

export interface IGetUserUseCase {
  execute({ userId, role }: IGetUserRequestDTO): Promise<ResponseDTO>;
}
