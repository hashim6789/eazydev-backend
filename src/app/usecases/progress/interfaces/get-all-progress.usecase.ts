import { Payload, QueryProgress, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAllProgressUseCase {
  execute(query: QueryProgress, authData: Payload): Promise<ResponseDTO>;
}
