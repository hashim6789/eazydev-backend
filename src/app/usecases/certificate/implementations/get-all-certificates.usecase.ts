import {
  Payload,
  QueryCertificate,
  ResponseDTO,
} from "../../../../domain/dtos";
import { CertificateErrorType } from "../../../../domain/enums/certificate";
import { ICertificateRepository } from "../../../repositories";
import { IGetAllCertificateUseCase } from "../interfaces";

export class GetAllCertificateUseCase implements IGetAllCertificateUseCase {
  constructor(private certificateRepository: ICertificateRepository) {}

  async execute(
    { userId }: Payload,
    query: QueryCertificate
  ): Promise<ResponseDTO> {
    try {
      const certificateData = await this.certificateRepository.findAllByUser(
        userId,
        query
      );

      if (!certificateData) {
        return {
          data: { error: CertificateErrorType.CertificateFetchingFailed },
          success: false,
        };
      }

      return { data: certificateData, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
