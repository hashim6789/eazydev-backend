import {
  IChatGroupOutDTO,
  ICreateChatGroupInDTO,
} from "../../domain/dtos/chat-group";

export interface IChatGroupRepository {
  create(data: ICreateChatGroupInDTO): Promise<IChatGroupOutDTO>;
}
