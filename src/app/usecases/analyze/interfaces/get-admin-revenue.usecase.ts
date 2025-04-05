import { ResponseDTO } from "../../../../domain/dtos";

export interface IGetAdminRevenueAnalyzeUseCase {
  execute(): Promise<ResponseDTO>;
}
