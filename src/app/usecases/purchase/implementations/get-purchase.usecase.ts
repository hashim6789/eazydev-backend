import {
  IGetPurchaseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import {
  AuthenticateUserErrorType,
  PurchaseErrorType,
} from "../../../../domain/enums";
import { IPurchaseRepository } from "../../../../infra/repositories";
import { IGetPurchaseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetPurchaseUseCases implements IGetPurchaseUseCase {
  constructor(private _purchaseRepository: IPurchaseRepository) {}

  async execute(
    { id }: IGetPurchaseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      const purchase = await this._purchaseRepository.findById(id);
      if (!purchase) {
        return {
          data: { error: PurchaseErrorType.PurchaseNotFound },
          success: false,
        };
      }

      if (purchase.learnerId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      return { data: purchase, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
