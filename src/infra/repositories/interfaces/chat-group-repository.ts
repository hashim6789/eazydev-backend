import {
  // IChatGroupOutDTO,
  IChatGroupOutPopulatedDTO,
  // ICreateChatGroupInDTO,
} from "../../../domain/dtos/chat-group";
import { Role } from "../../../domain/types";
import { IChatGroup } from "../../databases/interfaces";
import { BaseRepository } from "../implementations";

export interface IChatGroupRepository extends BaseRepository<IChatGroup> {
  // create(data: ICreateChatGroupInDTO): Promise<IChatGroupOutDTO>;
  findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IChatGroupOutPopulatedDTO[]>;
  addLearnerToChatGroup(courseId: string, learnerId: string): Promise<boolean>;
}
