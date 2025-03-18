import { IGetMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IGetMaterialUseCase {
  execute(query: IGetMaterialRequestDTO): Promise<ResponseDTO>;
}
