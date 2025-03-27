import {
  IGetCertificateRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IGetCertificateUseCase {
  execute(
    data: IGetCertificateRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
