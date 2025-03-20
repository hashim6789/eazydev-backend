import { IGetAllCategoryAdminUseCase } from "../../../../app/usecases/category";
import { IGetAllCourseUseCase } from "../../../../app/usecases/course";
import {
  Payload,
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
export class GetAllCourseController implements IController {
  constructor(
    private getAllCourseCase: IGetAllCourseUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryParams = Object.keys(httpRequest.query);

      if (
        // queryParams.includes("role") &&
        queryParams.includes("category") &&
        queryParams.includes("search") &&
        queryParams.includes("sort") &&
        queryParams.includes("page") &&
        queryParams.includes("limit")
      ) {
        const { role, userId } = httpRequest.body as Payload;

        const query = httpRequest.query as QueryCourse;

        response = await this.getAllCourseCase.execute(query, { userId, role });
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
