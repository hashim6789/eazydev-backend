import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUploadMaterialRequestDTO } from "../../../../domain/dtos/upload";

export interface IMaterialContentUploadUseCase {
  execute(
    data: IUploadMaterialRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
