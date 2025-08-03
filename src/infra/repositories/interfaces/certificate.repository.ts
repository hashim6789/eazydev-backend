import {
  ICertificateOutPopulateDTO,
  PaginationDTO,
  SimplePagination,
} from "../../../domain/dtos";
import { ICertificate } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";
import { Types } from "mongoose";

export interface ICertificateRepository extends IBaseRepository<ICertificate> {
  findByProgressId(
    progressId: string
  ): Promise<ICertificateOutPopulateDTO | null>;
  findById(
    certificateId: string | Types.ObjectId
  ): Promise<ICertificate | null>;
  findAllByUser(
    userId: string,
    query: SimplePagination
  ): Promise<PaginationDTO | null>;
}
