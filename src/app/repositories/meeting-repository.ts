import { IMeetingOutDTO, IMeetingOutPopulatedDTO } from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { MeetingEntity } from "../../domain/entities";
import { Role } from "../../domain/types";

export interface IMeetingRepository {
  create(data: MeetingEntity): Promise<IMeetingOutDTO>;
  findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IMeetingOutPopulatedDTO[]>;
}
