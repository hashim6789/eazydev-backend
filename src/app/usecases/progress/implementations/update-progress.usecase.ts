import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUpdateProgressRequestDTO } from "../../../../domain/dtos/progress";
import { IUpdateProgressUseCase } from "../interfaces";
import { Payload } from "../../../../domain/dtos";
import {
  ICertificateRepository,
  IProgressRepository,
} from "../../../../infra/repositories";
import { ProgressErrorType } from "../../../../domain/enums/progress";
import { CertificateEntity } from "../../../../domain/entities";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { mapCertificateToDocument } from "../../../../infra/databases/mappers/certificates";

export class UpdateProgressUseCase implements IUpdateProgressUseCase {
  constructor(
    private progressRepository: IProgressRepository,
    private certificateRepository: ICertificateRepository
  ) {}

  async execute(
    { progressId, materialId }: IUpdateProgressRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const progress = await this.progressRepository.updateProgress(
        progressId,
        materialId
      );

      if (!progress) {
        return {
          success: false,
          data: { error: ProgressErrorType.ProgressNotFound },
        };
      }

      if (progress.isCourseCompleted) {
        const certificateEntity = CertificateEntity.create({
          progressId,
          courseId: progress.courseId,
          mentorId: progress.mentorId,
          learnerId: userId,
          issueDate: Date.now(),
        });

        await this.certificateRepository.create(
          mapCertificateToDocument(certificateEntity)
        );
      }

      return {
        statusCode: 200,
        success: true,
        data: { success: true },
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
