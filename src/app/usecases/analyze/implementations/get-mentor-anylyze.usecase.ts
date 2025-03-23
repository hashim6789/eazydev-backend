import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  AnalysisErrorType,
  AuthenticateUserErrorType,
} from "../../../../domain/enums";
import { ICourseRepository, IProgressRepository } from "../../../repositories";
import { IGetMentorAnalyzeUseCase } from "../interfaces";

export class GetMentorAnalyzeUseCase implements IGetMentorAnalyzeUseCase {
  constructor(
    private progressRepository: IProgressRepository,
    private courseRepository: ICourseRepository
  ) {}

  async execute({ userId, role }: Payload): Promise<ResponseDTO> {
    try {
      if (role !== "mentor") {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }
      const fetchedProgressData = await this.progressRepository.mentorAnalysis(
        userId
      );
      if (!fetchedProgressData) {
        return {
          data: { error: AnalysisErrorType.AnalysisFetchingFailed },
          success: false,
        };
      }

      const fetchedRevenueData = await this.courseRepository.userRevenueAnalyze(
        userId
      );
      if (!fetchedRevenueData) {
        return {
          data: { error: AnalysisErrorType.AnalysisFetchingFailed },
          success: false,
        };
      }

      return {
        data: {
          courseStatusData: fetchedRevenueData.courseStatusData,
          enrollmentData: fetchedProgressData.enrollmentData,
          completionRateData: fetchedProgressData.completionRateData,
          revenueData: fetchedRevenueData.revenueData,
        },
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
