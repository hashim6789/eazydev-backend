import { IGetAllCategoryAdminUseCase } from "../../../../app/usecases/category";
import {
  IGetAllCourseUseCase,
  IGetCourseUseCase,
} from "../../../../app/usecases/course";
import {
  QueryCategory,
  QueryCourse,
  ResponseDTO,
} from "../../../../domain/dtos";
import { Role } from "../../../../domain/types";
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
export class GetCourseController implements IController {
  constructor(
    private getCourseCase: IGetCourseUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
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
