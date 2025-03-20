import {
  IJoinMeetingRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IJoinMeetingUseCase {
  execute(
    data: IJoinMeetingRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
