import { ResponseDTO } from "../../../../domain/dtos/response";
import { ICreateChatMessageRequestDTO, Payload } from "../../../../domain/dtos";
import { IChatMessageRepository } from "../../../repositories";
import { ICreateChatMessageUseCase } from "../interfaces/post-chat-message.usecase";
import { ChatMessageEntity } from "../../../../domain/entities";

export class CreateChatMessageUseCase implements ICreateChatMessageUseCase {
  constructor(private chatMessageRepository: IChatMessageRepository) {}

  async execute(
    { message, groupId }: ICreateChatMessageRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const chatMessage = ChatMessageEntity.create({
        group: groupId,
        sender: userId,
        message,
        createdAt: Date.now(),
      });

      const createdMessage = await this.chatMessageRepository.create(
        chatMessage
      );

      return {
        statusCode: 201,
        success: true,
        data: createdMessage,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
