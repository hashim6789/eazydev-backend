import { IGetAllCertificateUseCase } from "../../../../app/usecases/certificate";
import {
  Payload,
  QueryCertificate,
  ResponseDTO,
} from "../../../../domain/dtos";
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import { IController } from "../IController";

/**
 * Controller for handling requests to getAll category.
 */
export class GetAllCertificatesController implements IController {
  constructor(
    private getAllCertificateCase: IGetAllCertificateUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryParams = Object.keys(httpRequest.query);

      if (queryParams.includes("page") && queryParams.includes("limit")) {
        const { role, userId } = httpRequest.body as Payload;

        const query = httpRequest.query as QueryCertificate;

        response = await this.getAllCertificateCase.execute(
          { userId, role },
          query
        );
      } else {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
