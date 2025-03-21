import {
  IChatGroupOutDTO,
  IChatGroupOutPopulatedDTO,
  ICreateChatGroupInDTO,
} from "../../domain/dtos/chat-group";
import { Role } from "../../domain/types";

export interface IChatGroupRepository {
  create(data: ICreateChatGroupInDTO): Promise<IChatGroupOutDTO>;
  findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IChatGroupOutPopulatedDTO[]>;
}
