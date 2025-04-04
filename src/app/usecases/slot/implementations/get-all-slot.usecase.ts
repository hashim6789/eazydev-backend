import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { ISlotRepository } from "../../../repositories";
import { IGetAllSlotUseCase } from "../interfaces";

export class GetAllSlotUseCase implements IGetAllSlotUseCase {
  constructor(private slotRepository: ISlotRepository) {}

  async execute(
    // { mentorId }: IGetAllSlotRequestDTO,
    { role, userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const slots = await this.slotRepository.findAllByMentorId(userId);

      return { data: slots, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
