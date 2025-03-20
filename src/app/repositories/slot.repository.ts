import { ISlotOutDTO, ISlotOutPopulatedDTO } from "../../domain/dtos";
import { SlotEntity } from "../../domain/entities";

export interface ISlotRepository {
  create(data: SlotEntity): Promise<ISlotOutDTO>;
  findAllByMentorId(mentorId: string): Promise<ISlotOutPopulatedDTO[]>;
  findById(id: string): Promise<ISlotOutDTO | null>;
  bookById(id: string): Promise<boolean>;
}
