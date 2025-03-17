import { ResponseDTO } from "../../../domain/dtos/response";
import { GetUserRequestDTO } from "../../../domain/dtos/user/get-user-request.dto";

export interface IGetUserUseCase {
  execute({ userId, role }: GetUserRequestDTO): Promise<ResponseDTO>;
}
