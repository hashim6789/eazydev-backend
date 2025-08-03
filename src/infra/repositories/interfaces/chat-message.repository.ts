import {
  // IChatMessageOutDTO,
  IChatMessagePopulatedDTO,
} from "../../../domain/dtos";
// import { ChatMessageEntity } from "../../../domain/entities";
import { IChatMessage } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";

export interface IChatMessageRepository extends IBaseRepository<IChatMessage> {
  // create(data: ChatMessageEntity): Promise<IChatMessageOutDTO>;
  findAllByGroup(groupId: string): Promise<IChatMessagePopulatedDTO[]>;
}
