import { ResponseDTO } from "../../../../domain/dtos/response";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IPurchaseRepository } from "../../../../infra/repositories";
import { IGetAdminAnalyzeUseCase } from "../interfaces";

export class GetAdminRevenueAnalyzeUseCase implements IGetAdminAnalyzeUseCase {
  constructor(private _purchaseRepository: IPurchaseRepository) {}

  async execute(): Promise<ResponseDTO> {
    try {
      const monthlyRevenueData =
        await this._purchaseRepository.analyzeAdminRevenue();

      return {
        data: monthlyRevenueData,
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
