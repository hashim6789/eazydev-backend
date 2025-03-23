import { Payload, ResponseDTO } from "../../../../domain/dtos";
import { IGetAllChatMessagesRequestDTO } from "../../../../domain/dtos/chat-group";

export interface IGetAllChatMessageUseCase {
  execute(
    query: IGetAllChatMessagesRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
