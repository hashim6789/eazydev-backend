import { ResponseDTO } from "../../../../domain/dtos/response";
import { BlockUserRequestDTO } from "../../../../domain/dtos";

export interface IBlockUserUseCase {
  execute({ userId, change }: BlockUserRequestDTO): Promise<ResponseDTO>;
}
