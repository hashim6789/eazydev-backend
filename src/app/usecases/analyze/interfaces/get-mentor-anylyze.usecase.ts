import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface IGetMentorAnalyzeUseCase {
  execute(authData: Payload): Promise<ResponseDTO>;
}
