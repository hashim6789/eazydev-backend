import { IUpdateMaterialDTO } from "../../../../domain/dtos/material/material";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IUpdateMaterialUseCase {
  execute(query: IUpdateMaterialDTO): Promise<ResponseDTO>;
}
