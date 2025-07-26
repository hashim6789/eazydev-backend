import {
  IMeetingOutDTO,
  IMeetingOutPopulatedDTO,
  Meeting,
} from "../../../domain/dtos";
import { MeetingEntity } from "../../../domain/entities";
import { Role } from "../../../domain/types";

export interface IMeetingRepository {
  create(data: MeetingEntity): Promise<IMeetingOutDTO>;
  findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IMeetingOutPopulatedDTO[]>;
  findById(id: string): Promise<IMeetingOutDTO | null>;
  updateById(
    id: string,
    data: Partial<Meeting>
  ): Promise<IMeetingOutDTO | null>;
}
