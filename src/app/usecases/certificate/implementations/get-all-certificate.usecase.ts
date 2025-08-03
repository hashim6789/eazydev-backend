import {
  PaginationDTO,
  Payload,
  ResponseDTO,
  SimplePagination,
} from "../../../../domain/dtos";
import { ICertificateRepository } from "../../../../infra/repositories";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IGetAllCertificatesUseCase } from "../interfaces";

export class GetAllCertificateUseCase implements IGetAllCertificatesUseCase {
  constructor(private certificateRepository: ICertificateRepository) {}

  async execute(
    query: SimplePagination,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      const { userId, role } = authData;
      let certificates: PaginationDTO | null = null;
      if (role === "learner") {
        certificates = await this.certificateRepository.findAllByUser(
          userId,
          query
        );
      }

      return { success: true, data: certificates ?? [] };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
