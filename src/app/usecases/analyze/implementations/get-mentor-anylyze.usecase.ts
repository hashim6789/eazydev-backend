import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  AnalysisErrorType,
  AuthenticateUserErrorType,
} from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  ICourseRepository,
  IProgressRepository,
} from "../../../../infra/repositories";
import { IGetMentorAnalyzeUseCase } from "../interfaces";

export class GetMentorAnalyzeUseCase implements IGetMentorAnalyzeUseCase {
  constructor(
    private _progressRepository: IProgressRepository,
    private _courseRepository: ICourseRepository
  ) {}

  async execute({ userId, role }: Payload): Promise<ResponseDTO> {
    try {
      if (role !== "mentor") {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }
      const fetchedProgressData = await this._progressRepository.mentorAnalysis(
        userId
      );
      if (!fetchedProgressData) {
        return {
          data: { error: AnalysisErrorType.AnalysisFetchingFailed },
          success: false,
        };
      }

      const fetchedRevenueData =
        await this._courseRepository.userRevenueAnalyze(userId);
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
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
