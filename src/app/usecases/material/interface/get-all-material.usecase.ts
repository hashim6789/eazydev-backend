import { IGetAllMaterialRequestDTO } from "../../../../domain/dtos/material/material";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { Role } from "../../../../domain/types/user";

export interface IGetAllMaterialUseCase {
  execute(query: IGetAllMaterialRequestDTO): Promise<ResponseDTO>;
}
