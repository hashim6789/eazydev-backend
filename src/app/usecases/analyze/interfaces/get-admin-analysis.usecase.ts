import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAdminAnalyzeUseCase {
  execute(authData: Payload): Promise<ResponseDTO>;
}
