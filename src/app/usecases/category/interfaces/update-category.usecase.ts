import {
  IUpdateCategoryRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IUpdateCategoryUseCase {
  execute(
    data: IUpdateCategoryRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
