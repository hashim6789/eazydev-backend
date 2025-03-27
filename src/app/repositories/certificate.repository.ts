import {
  ICertificateOutDTO,
  ICertificateOutPopulateDTO,
} from "../../domain/dtos";
import { CertificateEntity } from "../../domain/entities";

export interface ICertificateRepository {
  findByProgressId(
    progressId: string
  ): Promise<ICertificateOutPopulateDTO | null>;
  create(data: CertificateEntity): Promise<ICertificateOutDTO>;
}
