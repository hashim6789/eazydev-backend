import { ResponseDTO } from "../../../../domain/dtos/response";
import { BlockUserRequestDTO } from "../../../../domain/dtos/user/get-user-request.dto";

export interface IBlockUserUseCase {
  execute({ userId, change }: BlockUserRequestDTO): Promise<ResponseDTO>;
}
