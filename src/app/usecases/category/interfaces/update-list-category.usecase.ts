import {
  IUpdateListCategoryRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IUpdateListCategoryUseCase {
  execute(
    data: IUpdateListCategoryRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
