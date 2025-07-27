import { IChatMessageRepository } from "../../../repositories";
import { CreateChatMessageUseCase } from "../../../../app/usecases/chat/implementations/create-chat-message.usecase";
import { ICreateChatMessageUseCase } from "../../../../app/usecases/chat/interfaces/post-chat-message.usecase";
import { CreateChatMessageController } from "../../../../presentation/http/controllers/chat";
import { IController } from "../../../../presentation/http/controllers/IController";
import ChatMessageModel from "../../../databases/models/chat-message.model";
import { ChatMessageRepository } from "../../../repositories/implementations/chat-message.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function createChatMessageComposer(): IController {
  const repository: IChatMessageRepository = new ChatMessageRepository(
    ChatMessageModel
  );
  const useCase: ICreateChatMessageUseCase = new CreateChatMessageUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new CreateChatMessageController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
