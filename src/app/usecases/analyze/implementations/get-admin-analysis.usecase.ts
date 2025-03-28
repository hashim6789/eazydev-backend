import { ResponseDTO } from "../../../../domain/dtos/response";
import { AnalysisErrorType } from "../../../../domain/enums";
import {
  IProgressRepository,
  IPurchaseRepository,
  IUsersRepository,
} from "../../../repositories";
import { IGetAdminAnalyzeUseCase } from "../interfaces";

export class GetAdminAnalyzeUseCase implements IGetAdminAnalyzeUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private progressRepository: IProgressRepository,
    private purchaseRepository: IPurchaseRepository
  ) {}

  async execute(): Promise<ResponseDTO> {
    try {
      const userStatuses = await this.usersRepository.getUsersAnalysis();
      const coursePerformanceData =
        await this.progressRepository.analyzeAllCoursePerformance();
      const monthlyRevenueData =
        await this.purchaseRepository.analyzeMonthlyRevenue();
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
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
