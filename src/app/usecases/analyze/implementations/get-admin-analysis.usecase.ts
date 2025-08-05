import { ResponseDTO } from "../../../../domain/dtos/response";
import { AnalysisErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  IProgressRepository,
  IPurchaseRepository,
  IUsersRepository,
} from "../../../../infra/repositories";
import { IGetAdminAnalyzeUseCase } from "../interfaces";

export class GetAdminAnalyzeUseCase implements IGetAdminAnalyzeUseCase {
  constructor(
    private _usersRepository: IUsersRepository,
    private _progressRepository: IProgressRepository,
    private _purchaseRepository: IPurchaseRepository
  ) {}

  async execute(): Promise<ResponseDTO> {
    try {
      const userStatuses = await this._usersRepository.getUsersAnalysis();
      const coursePerformanceData =
        await this._progressRepository.analyzeAllCoursePerformance();
      const monthlyRevenueData =
        await this._purchaseRepository.analyzeMonthlyRevenue();
      if (!monthlyRevenueData) {
        return {
          data: { error: AnalysisErrorType.AnalysisFetchingFailed },
          success: false,
        };
      }

      return {
        data: {
          learnerStatusData: userStatuses.learnerData,
          mentorStatusData: userStatuses.mentorData,
          coursePerformanceData,
          monthlyRevenueData,
        },
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
