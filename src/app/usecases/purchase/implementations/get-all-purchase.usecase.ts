import { Payload, ResponseDTO } from "../../../../domain/dtos";
import { PaginationDTO } from "../../../../domain/dtos/pagination.dtos";
import {
  AuthenticateUserErrorType,
  PurchaseErrorType,
} from "../../../../domain/enums";
import { IPurchaseRepository } from "../../../repositories";
import { IGetAllPurchaseUseCase } from "../interfaces";

export class GetAllPurchaseUseCases implements IGetAllPurchaseUseCase {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  async execute({ userId, role }: Payload): Promise<ResponseDTO> {
    try {
      let purchases: null | PaginationDTO = null;
      if (role === "learner") {
        purchases = await this.purchaseRepository.findAllByUser(userId);
      }
      if (!purchases) {
        return {
          data: { error: PurchaseErrorType.PurchaseNotFound },
          success: false,
        };
      }

      return { data: purchases.body, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
