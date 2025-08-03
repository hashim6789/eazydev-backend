import { ResponseDTO } from "../../../../domain/dtos";

export interface IGetPreviewCertificatesUseCase {
  execute(certificateId: string): Promise<ResponseDTO>;
}
