import { ICertificateOutDTO } from "../../domain/dtos";
import { CertificateEntity } from "../../domain/entities";

export interface ICertificateRepository {
  findByProgressId(progressId: string): Promise<ICertificateOutDTO | null>;
  create(data: CertificateEntity): Promise<ICertificateOutDTO>;
}
