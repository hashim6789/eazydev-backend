import { IChatMessageRepository } from "../../../repositories";
import { GetAllChatMessageUseCase } from "../../../../app/usecases/chat/implementations";
import { IGetAllChatMessageUseCase } from "../../../../app/usecases/chat/interfaces";
import { GetAllChatMessageController } from "../../../../presentation/http/controllers/chat";
import { IController } from "../../../../presentation/http/controllers/IController";
import ChatMessageModel from "../../../databases/models/chat-message.model";
import { ChatMessageRepository } from "../../../repositories/implementations/chat-message.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getAllMessagesComposer(): IController {
  const repository: IChatMessageRepository = new ChatMessageRepository(
    ChatMessageModel
  );
  const useCase: IGetAllChatMessageUseCase = new GetAllChatMessageUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllChatMessageController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
