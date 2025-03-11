import { IGetAllMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { Role } from "../../../../domain/dtos/role.dtos";

export interface IGetAllMaterialUseCase {
  execute(query: IGetAllMaterialRequestDTO): Promise<ResponseDTO>;
}
