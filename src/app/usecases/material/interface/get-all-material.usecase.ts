import { IGetAllMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IGetAllMaterialUseCase {
  execute(query: IGetAllMaterialRequestDTO): Promise<ResponseDTO>;
}
