import { ResponseDTO } from "../../../../domain/dtos/response";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IPurchaseRepository } from "../../../repositories";
import { IGetAdminAnalyzeUseCase } from "../interfaces";

export class GetAdminRevenueAnalyzeUseCase implements IGetAdminAnalyzeUseCase {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  async execute(): Promise<ResponseDTO> {
    try {
      const monthlyRevenueData =
        await this.purchaseRepository.analyzeAdminRevenue();

      return {
        data: monthlyRevenueData,
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
