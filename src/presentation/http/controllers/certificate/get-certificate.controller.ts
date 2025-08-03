import { IGetCertificateUseCase } from "../../../../app/usecases/certificate/interfaces/create-certificate.usecase";
import {
  GetCertificateBodySchema,
  GetCertificatePathSchema,
} from "../../../../domain/dtos";
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
 * Controller for handling requests to create a Certificate.
 */
export class GetCertificateController implements IController {
  constructor(
    private getCertificateUseCase: IGetCertificateUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = GetCertificateBodySchema.safeParse(
      httpRequest.body ?? {}
    );
    const pathValidation = GetCertificatePathSchema.safeParse(
      httpRequest.path ?? {}
    );

    if (!bodyValidation.success) {
      const firstError = extractFirstZodMessage(bodyValidation.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    if (!pathValidation.success) {
      const firstError = extractFirstZodMessage(pathValidation.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = bodyValidation.data;
    const { progressId } = pathValidation.data;

    const response = await this.getCertificateUseCase.execute(
      { progressId },
      { userId, role }
    );

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
