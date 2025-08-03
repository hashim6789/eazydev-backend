import { ResponseDTO } from "../../../../domain/dtos";
import { CertificateErrorType } from "../../../../domain/enums/certificate";
import { mapDocumentToCertificate } from "../../../../infra/databases/mappers";
import { ICertificateRepository } from "../../../../infra/repositories";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IGetPreviewCertificatesUseCase } from "../interfaces";

export class GetPreviewCertificateUseCase
  implements IGetPreviewCertificatesUseCase
{
  constructor(private certificateRepository: ICertificateRepository) {}

  async execute(certificateId: string): Promise<ResponseDTO> {
    try {
      const certificate = await this.certificateRepository.findById(
        certificateId
      );

      if (!certificate) {
        return {
          data: { error: CertificateErrorType.CertificateNotFound },
          success: false,
        };
      }

      return { success: true, data: mapDocumentToCertificate(certificate) };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
