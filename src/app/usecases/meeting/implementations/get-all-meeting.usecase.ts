import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { IMeetingRepository, ISlotRepository } from "../../../repositories";
import { IGetAllMeetingUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetAllMeetingUseCase implements IGetAllMeetingUseCase {
  constructor(private meetingRepository: IMeetingRepository) {}

  async execute({ role, userId }: Payload): Promise<ResponseDTO> {
    try {
      const slots = await this.meetingRepository.findAllByUserAndRole(
        userId,
        role
      );

      return { data: slots, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
