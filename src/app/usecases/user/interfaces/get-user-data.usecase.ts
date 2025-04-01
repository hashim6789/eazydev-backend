import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetUserDataRequestDTO } from "../../../../domain/dtos";

export interface IGetUserDataUseCase {
  execute({ id }: IGetUserDataRequestDTO): Promise<ResponseDTO>;
}
