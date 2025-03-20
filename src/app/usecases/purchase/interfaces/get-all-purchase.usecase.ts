import {
  ICreatePurchaseRequestDTO,
  IGetPurchaseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IGetAllPurchaseUseCase {
  execute(authData: Payload): Promise<ResponseDTO>;
}
