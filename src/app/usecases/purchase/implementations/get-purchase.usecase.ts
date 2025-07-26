import {
  ICreatePurchaseRequestDTO,
  IGetPurchaseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { PurchaseEntity } from "../../../../domain/entities/purchase";
import {
  AuthenticateUserErrorType,
  CourseErrorType,
  PurchaseErrorType,
} from "../../../../domain/enums";
import { ICourseRepository, IPurchaseRepository } from "../../../repositories";
import { ICreatePurchaseUseCase, IGetPurchaseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetPurchaseUseCases implements IGetPurchaseUseCase {
  constructor(
    private purchaseRepository: IPurchaseRepository,
    private courseRepository: ICourseRepository
  ) {}

  async execute(
    { id }: IGetPurchaseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      const purchase = await this.purchaseRepository.findById(id);
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
