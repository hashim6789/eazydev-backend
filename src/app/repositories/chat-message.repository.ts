import {
  IChatMessageOutDTO,
  IChatMessagePopulatedDTO,
} from "../../domain/dtos";
import { ChatMessageEntity } from "../../domain/entities";

export interface IChatMessageRepository {
  create(data: ChatMessageEntity): Promise<IChatMessageOutDTO>;
  findAllByGroup(groupId: string): Promise<IChatMessagePopulatedDTO[]>;
}
