import {
  // IMeetingOutDTO,
  // Meeting,
  IMeetingOutPopulatedDTO,
} from "../../../domain/dtos";
// import { MeetingEntity } from "../../../domain/entities";
import { Role } from "../../../domain/types";
import { IMeeting } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";

export interface IMeetingRepository extends IBaseRepository<IMeeting> {
  // create(data: MeetingEntity): Promise<IMeetingOutDTO>;
  findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IMeetingOutPopulatedDTO[]>;
  // findById(id: string): Promise<IMeetingOutDTO | null>;
  // updateById(
  //   id: string,
  //   data: Partial<Meeting>
  // ): Promise<IMeetingOutDTO | null>;
}
