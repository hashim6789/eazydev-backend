import { IGetSignedUrlUseCase } from "../../../../app/usecases/progress";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { IGetSignedUrlRequestDTO } from "../../../../domain/dtos/progress";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { IController } from "../IController";
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";

/**
 * Controller for handling requests to create a user.
 */
export class GetSignedUrlController implements IController {
  constructor(
    private getSignedUrlUseCase: IGetSignedUrlUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.path &&
      Object.keys(httpRequest.path).length > 0 &&
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const pathParams = Object.keys(httpRequest.path);
      const bodyParams = Object.keys(httpRequest.body);

      if (
        pathParams.includes("progressId") &&
        bodyParams.includes("fileKey") &&
        bodyParams.includes("materialType") &&
        bodyParams.includes("role") &&
        bodyParams.includes("userId")
      ) {
        const { progressId } = httpRequest.path as Pick<
          IGetSignedUrlRequestDTO,
          "progressId"
        >;

        const { userId, role, materialType, fileKey } =
          httpRequest.body as Payload &
            Omit<IGetSignedUrlRequestDTO, "progressId">;
        response = await this.getSignedUrlUseCase.execute(
          { progressId, materialType, fileKey },
          {
            userId,
            role,
          }
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
