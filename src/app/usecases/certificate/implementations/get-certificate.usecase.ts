import {
  IGetCertificateRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { CertificateEntity } from "../../../../domain/entities";
import { CertificateErrorType } from "../../../../domain/enums/certificate";
import { ProgressErrorType } from "../../../../domain/enums/progress";
import {
  ICertificateRepository,
  IProgressRepository,
} from "../../../../infra/repositories";
import { IGetCertificateUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  mapCertificateToDocument,
  mapProgressToDTO,
} from "../../../../infra/databases/mappers";

export class GetCertificateUseCase implements IGetCertificateUseCase {
  constructor(
    private _certificateRepository: ICertificateRepository,
    private _progressRepository: IProgressRepository
  ) {}

  async execute(
    { progressId }: IGetCertificateRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const certificate = await this._certificateRepository.findByProgressId(
        progressId
      );
      if (certificate) {
        return {
          data: certificate,
          success: true,
        };
      }

      const progress = await this._progressRepository.findById(progressId);
      if (!progress) {
        return {
          data: { error: ProgressErrorType.ProgressNotFound },
          success: false,
        };
      }

      if (!progress.isCourseCompleted) {
        return {
          data: { error: ProgressErrorType.ProgressNotCompleted },
          success: false,
        };
      }

      const mappedData = mapProgressToDTO(progress);

      const certificateEntity = CertificateEntity.create({
        progressId,
        courseId: mappedData.courseId,
        mentorId: mappedData.mentorId,
        learnerId: userId,
        issueDate: Date.now(),
      });

      const createdCertificate = this._certificateRepository.create(
        mapCertificateToDocument(certificateEntity)
      );
      if (!createdCertificate) {
        return {
          data: { error: CertificateErrorType.CertificateCreationFailed },
          success: false,
        };
      }

      return { data: createdCertificate, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
