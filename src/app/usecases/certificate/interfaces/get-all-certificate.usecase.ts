import {
  Payload,
  ResponseDTO,
  SimplePagination,
} from "../../../../domain/dtos";

export interface IGetAllCertificatesUseCase {
  execute(query: SimplePagination, authData: Payload): Promise<ResponseDTO>;
}
