import { Payload, ResponseDTO } from "../../../../domain/dtos";
import { IPurchaseRepository } from "../../../../infra/repositories";
import { ICheckCoursePurchasedUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class CheckCoursePurchasedUseCases
  implements ICheckCoursePurchasedUseCase
{
  constructor(private _purchaseRepository: IPurchaseRepository) {}

  async execute(
    courseId: string,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      const purchase = await this._purchaseRepository.findOne({
        courseId,
        learnerId: userId,
      });

      return { success: true, data: purchase ? true : false };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
