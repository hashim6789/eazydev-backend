import { IGetLearningContentsUseCase } from "../../../../app/usecases/progress";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { IGetLearningContentRequestDTO } from "../../../../domain/dtos/progress";
import { ResponseDTO } from "../../../../domain/dtos/response";
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
 * Controller for handling requests to create a user.
 */
export class GetLearningContentController implements IController {
  constructor(
    private getLearningContentUseCase: IGetLearningContentsUseCase,
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
        bodyParams.includes("role") &&
        bodyParams.includes("userId")
      ) {
        const { progressId } =
          httpRequest.path as IGetLearningContentRequestDTO;

        const { userId, role } = httpRequest.body as Payload;
        response = await this.getLearningContentUseCase.execute(
          { progressId },
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
