import {
  ICreatePurchaseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface ICreatePurchaseUseCase {
  execute(
    data: ICreatePurchaseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
