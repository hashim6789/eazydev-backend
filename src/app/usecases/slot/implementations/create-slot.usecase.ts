import { ICreateSlotRequestDTO } from "../../../../domain/dtos";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { SlotEntity } from "../../../../domain/entities";
import { SlotErrorType } from "../../../../domain/enums";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { ISlotRepository } from "../../../repositories";
import { ICreateSlotUseCase } from "../interfaces";

export class CreateSlotUseCase implements ICreateSlotUseCase {
  constructor(private slotRepository: ISlotRepository) {}

  async execute(
    {
      mentorId,
      time,
    }: // lessonId,
    ICreateSlotRequestDTO,
    { role, userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      if (mentorId !== userId || role !== "mentor") {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      const slots = await this.slotRepository.findAllByMentorId(mentorId);
      if (slots.length > 0 && slots.some((slot) => slot.time === time)) {
        return {
          data: { error: SlotErrorType.SlotAlreadyExist },
          success: false,
        };
      }
      const slotEntity = SlotEntity.create({
        mentorId,
        time,
        isBooked: false,
      });

      const createdSlot = await this.slotRepository.create(slotEntity);

      if (!createdSlot) {
        return {
          data: { error: SlotErrorType.SlotCreationFailed },
          success: false,
        };
      }

      return { data: { slot: createdSlot }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
