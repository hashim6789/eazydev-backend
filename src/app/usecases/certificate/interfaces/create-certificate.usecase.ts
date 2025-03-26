import {
  ICreateCertificateRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface ICreateCertificateUseCase {
  execute(
    data: ICreateCertificateRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
