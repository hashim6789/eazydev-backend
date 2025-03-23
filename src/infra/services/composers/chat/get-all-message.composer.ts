import { IChatMessageRepository } from "../../../../app/repositories";
import { GetAllChatMessageUseCase } from "../../../../app/usecases/chat/implementations";
import { IGetAllChatMessageUseCase } from "../../../../app/usecases/chat/interfaces";
import { GetAllChatMessageController } from "../../../../presentation/http/controllers/chat";
import { IController } from "../../../../presentation/http/controllers/IController";
import ChatMessageModel from "../../../databases/models/chat-message.model";
import { ChatMessageRepository } from "../../../repositories/chat-message.repository";

export function getAllMessagesComposer(): IController {
  const repository: IChatMessageRepository = new ChatMessageRepository(
    ChatMessageModel
  );
  const useCase: IGetAllChatMessageUseCase = new GetAllChatMessageUseCase(
    repository
  );
  const controller: IController = new GetAllChatMessageController(useCase);
  return controller;
}
