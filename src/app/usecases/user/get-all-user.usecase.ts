import { ResponseDTO } from "../../../domain/dtos/response.dtos";

export interface IGetAllUserUseCase {
  execute(page: number): Promise<ResponseDTO>;
}
