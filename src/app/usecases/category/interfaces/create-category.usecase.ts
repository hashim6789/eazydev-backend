import {
  ICreateCategoryRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface ICreateCategoryUseCase {
  execute(
    data: ICreateCategoryRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
