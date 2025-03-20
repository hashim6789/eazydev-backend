import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAllMeetingUseCase {
  execute(authData: Payload): Promise<ResponseDTO>;
}
