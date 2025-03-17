import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ICreateMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface ICreateMaterialUseCase {
  execute(
    data: ICreateMaterialRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
