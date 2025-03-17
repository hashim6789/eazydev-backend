import { ResponseDTO } from "../../../domain/dtos/response";
import { QueryUser } from "../../../domain/dtos/user";

export interface IGetAllUserUseCase {
  execute(query: QueryUser): Promise<ResponseDTO>;
}
