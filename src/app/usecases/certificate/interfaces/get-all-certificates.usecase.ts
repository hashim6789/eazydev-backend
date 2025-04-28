import {
  Payload,
  QueryCertificate,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IGetAllCertificateUseCase {
  execute(authData: Payload, query: QueryCertificate): Promise<ResponseDTO>;
}
