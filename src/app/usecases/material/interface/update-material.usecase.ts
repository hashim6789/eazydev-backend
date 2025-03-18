import { Payload } from "../../../../domain/dtos";
import { IUpdateMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IUpdateMaterialUseCase {
  execute(
    data: IUpdateMaterialRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
