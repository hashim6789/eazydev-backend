import {
  ICertificateOutPopulateDTO,
  PaginationDTO,
  SimplePagination,
} from "../../../domain/dtos";
import { ICertificate } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";

export interface ICertificateRepository extends IBaseRepository<ICertificate> {
  findByProgressId(
    progressId: string
  ): Promise<ICertificateOutPopulateDTO | null>;
  findAllByUser(
    userId: string,
    query: SimplePagination
  ): Promise<PaginationDTO | null>;
}
