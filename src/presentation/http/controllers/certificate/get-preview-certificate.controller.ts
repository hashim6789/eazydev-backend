import { IGetPreviewCertificatesUseCase } from "../../../../app/usecases/certificate";
import { GetPreviewCertificatePathSchema } from "../../../../domain/dtos";
import {
  HttpResponse,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import { extractFirstZodMessage } from "../../utils";
import { IController } from "../IController";

/**
 * Controller for handling requests to get preview of certificate.
 */
export class GetPreviewCertificateController implements IController {
  constructor(
    private getPreviewCertificateCase: IGetPreviewCertificatesUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = GetPreviewCertificatePathSchema.safeParse(
      httpRequest.path ?? {}
    );

    if (!pathValidation.success) {
      const queryError = !pathValidation.success
        ? extractFirstZodMessage(pathValidation.error)
        : null;

      const errorMessage = queryError || "Invalid request";
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { certificateId } = pathValidation.data;

    const response = await this.getPreviewCertificateCase.execute(
      certificateId
    );

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
