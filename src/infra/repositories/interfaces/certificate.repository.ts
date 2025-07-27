import {
  // ICertificateOutDTO,
  ICertificateOutPopulateDTO,
} from "../../../domain/dtos";
import { ICertificate } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";
// import { CertificateEntity } from "../../../domain/entities";

export interface ICertificateRepository extends IBaseRepository<ICertificate> {
  findByProgressId(
    progressId: string
  ): Promise<ICertificateOutPopulateDTO | null>;
  // create(data: CertificateEntity): Promise<ICertificateOutDTO>;
}
