import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IGetAllChatGroupUseCase,
  IGetAllChatMessageUseCase,
} from "../interfaces";
import { Payload } from "../../../../domain/dtos";
import {
  IChatGroupRepository,
  IChatMessageRepository,
} from "../../../repositories";
import { IGetAllChatMessagesRequestDTO } from "../../../../domain/dtos/chat-group";

export class GetAllChatMessageUseCase implements IGetAllChatMessageUseCase {
  constructor(private chatMessageRepository: IChatMessageRepository) {}

  async execute(
    { groupId }: IGetAllChatMessagesRequestDTO,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      const messages = await this.chatMessageRepository.findAllByGroup(groupId);
      return {
        statusCode: 200,
        success: true,
        data: messages,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
