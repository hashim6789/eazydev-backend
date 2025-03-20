import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetUserRequestDTO } from "../../../../domain/dtos/user/get-user-request.dto";

export interface IGetUserUseCase {
  execute({ userId, role }: IGetUserRequestDTO): Promise<ResponseDTO>;
}
