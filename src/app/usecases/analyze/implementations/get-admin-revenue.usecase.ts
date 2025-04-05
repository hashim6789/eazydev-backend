import { ResponseDTO } from "../../../../domain/dtos/response";
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
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
