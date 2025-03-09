import { ResponseDTO } from "../../../domain/dtos/response.dtos";
import { GetUserRequestDTO } from "../../../domain/dtos/user/get-user-request.dto";

export interface IGetUserUseCase {
  execute({ userId, role }: GetUserRequestDTO): Promise<ResponseDTO>;
}
