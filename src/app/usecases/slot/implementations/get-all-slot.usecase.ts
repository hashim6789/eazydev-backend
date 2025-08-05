import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { ISlotRepository } from "../../../../infra/repositories";
import { IGetAllSlotUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetAllSlotUseCase implements IGetAllSlotUseCase {
  constructor(private _slotRepository: ISlotRepository) {}

  async execute({ userId }: Payload): Promise<ResponseDTO> {
    try {
      const slots = await this._slotRepository.findAllByMentorId(userId);

      return { data: slots, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
