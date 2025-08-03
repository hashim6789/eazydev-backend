import { IChatGroupRepository } from "../../../repositories";
import { GetAllChatGroupUseCase } from "../../../../app/usecases/chat/implementations/get-all-chat-group.usecase";
import { IGetAllChatGroupUseCase } from "../../../../app/usecases/chat/interfaces";
import { GetAllChatGroupController } from "../../../../presentation/http/controllers/chat";
import { IController } from "../../../../presentation/http/controllers/IController";
import { ChatGroupModel } from "../../../databases/models";
import { ChatGroupRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getAllChatGroupComposer(): IController {
  const repository: IChatGroupRepository = new ChatGroupRepository(
    ChatGroupModel
  );
  const useCase: IGetAllChatGroupUseCase = new GetAllChatGroupUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllChatGroupController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
