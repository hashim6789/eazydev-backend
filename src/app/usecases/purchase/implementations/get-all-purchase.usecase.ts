import {
  Payload,
  ResponseDTO,
  SimplePagination,
} from "../../../../domain/dtos";
import { PaginationDTO } from "../../../../domain/dtos";
import { IPurchaseRepository } from "../../../../infra/repositories";
import { IGetAllPurchaseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetAllPurchaseUseCases implements IGetAllPurchaseUseCase {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  async execute(
    query: SimplePagination,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      let purchases: null | PaginationDTO = null;
      if (role === "learner") {
        purchases = await this.purchaseRepository.findAllByUser(userId, query);
      }

      return { success: true, data: purchases ?? [] };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
