import { IGetCourseUseCase } from "../../../../app/usecases/course";
import { ResponseDTO } from "../../../../domain/dtos";
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
export class GetCourseController implements IController {
  constructor(
    private getCourseCase: IGetCourseUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.path && Object.keys(httpRequest.path).length > 0) {
      const pathParams = Object.keys(httpRequest.path);

      if (pathParams.includes("courseId")) {
        const { courseId } = httpRequest.path as { courseId: string };

        response = await this.getCourseCase.execute(courseId);
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
