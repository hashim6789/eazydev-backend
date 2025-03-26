import {
  ICreateCertificateRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { CertificateEntity } from "../../../../domain/entities";
import {
  AuthenticateUserErrorType,
  CategoryErrorType,
} from "../../../../domain/enums";
import { CertificateErrorType } from "../../../../domain/enums/certificate";
import { ProgressErrorType } from "../../../../domain/enums/progress";
import {
  ICertificateRepository,
  IProgressRepository,
} from "../../../repositories";
import { ICreateCertificateUseCase } from "../interfaces";

export class CreateCertificateUseCase implements ICreateCertificateUseCase {
  constructor(
    private certificateRepository: ICertificateRepository,
    private progressRepository: IProgressRepository
  ) {}

  async execute(
    { progressId, learnerId }: ICreateCertificateRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (learnerId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      const certificate =
        this.certificateRepository.findByProgressId(progressId);
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
        learnerId,
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
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
