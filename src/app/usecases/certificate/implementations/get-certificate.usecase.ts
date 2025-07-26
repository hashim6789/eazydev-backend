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

export class GetCertificateUseCase implements IGetCertificateUseCase {
  constructor(
    private certificateRepository: ICertificateRepository,
    private progressRepository: IProgressRepository
  ) {}

  async execute(
    { progressId }: IGetCertificateRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const certificate = await this.certificateRepository.findByProgressId(
        progressId
      );
      if (certificate) {
        return {
          data: certificate,
          success: true,
        };
      }

      const progress = await this.progressRepository.findById(progressId);
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

      const certificateEntity = CertificateEntity.create({
        progressId,
        courseId: progress.courseId,
        mentorId: progress.mentorId,
        learnerId: userId,
        issueDate: Date.now(),
      });

      const createdCertificate =
        this.certificateRepository.create(certificateEntity);
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
