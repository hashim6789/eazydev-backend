import { IGetAllCategoryAdminUseCase } from "../../../../app/usecases/category";
import { IGetLessonUseCase } from "../../../../app/usecases/lesson";
import { Payload, ResponseDTO } from "../../../../domain/dtos";
import {
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
} from "../../helpers/implementations";
import { IController } from "../IController";

/**
 * Controller for handling requests to getAll category.
 */
export class GetLessonController implements IController {
  constructor(
    private getLessonCase: IGetLessonUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.path &&
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0 &&
      Object.keys(httpRequest.path).length > 0
    ) {
      const pathParams = Object.keys(httpRequest.path);
      const bodyParams = Object.keys(httpRequest.body);

      if (
        (pathParams.includes("lessonId") && bodyParams.includes("userid"),
        bodyParams.includes("role"))
      ) {
        const { lessonId } = httpRequest.path as { lessonId: string };
        const { userId, role } = httpRequest.body as Payload;

        response = await this.getLessonCase.execute(lessonId, { userId, role });
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
