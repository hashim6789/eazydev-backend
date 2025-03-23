import {
  ICreateChatMessageRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface ICreateChatMessageUseCase {
  execute(
    data: ICreateChatMessageRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
