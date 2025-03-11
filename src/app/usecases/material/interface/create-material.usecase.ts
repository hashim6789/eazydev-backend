import { Payload } from "../../../../domain/dtos/jwt-payload.dto";
import { ICreateMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response.dtos";

export interface ICreateMaterialUseCase {
  execute(
    data: ICreateMaterialRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
