import {
  ICertificateOutDTO,
  ICertificateOutPopulateDTO,
  QueryCertificate,
} from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { CertificateEntity } from "../../domain/entities";

export interface ICertificateRepository {
  findByProgressId(
    progressId: string
  ): Promise<ICertificateOutPopulateDTO | null>;
  create(data: CertificateEntity): Promise<ICertificateOutDTO>;
  findAllByUser(
    userId: string,
    query: QueryCertificate
  ): Promise<PaginationDTO | null>;
}
