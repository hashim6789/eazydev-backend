import { ResponseDTO } from "../../../../domain/dtos";

export interface IGetAdminAnalyzeUseCase {
  execute(): Promise<ResponseDTO>;
}
