import {
  IGetPurchaseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IGetPurchaseUseCase {
  execute(
    data: IGetPurchaseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
