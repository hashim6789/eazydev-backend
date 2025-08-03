import {
  Payload,
  ResponseDTO,
  SimplePagination,
} from "../../../../domain/dtos";

export interface IGetAllPurchaseUseCase {
  execute(query: SimplePagination, authData: Payload): Promise<ResponseDTO>;
}
