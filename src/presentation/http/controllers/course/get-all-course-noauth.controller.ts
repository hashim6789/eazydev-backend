import { IGetAllCourseUseCase } from "../../../../app/usecases/course";
import {
  GetCoursesQuerySchema,
  GetCoursesUserSchema,
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
 * Controller for handling requests to getAll category.
 */
export class GetAllCourseNoAuthController implements IController {
  constructor(
    private _getAllCourseCase: IGetAllCourseUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const queryValidation = GetCoursesQuerySchema.safeParse(
      httpRequest.query ?? {}
    );

    if (!queryValidation.success) {
      const queryError = !queryValidation.success
        ? extractFirstZodMessage(queryValidation.error)
        : null;

      const errorMessage = queryError || "Invalid request";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const query = queryValidation.data;

    const response = await this._getAllCourseCase.execute(query, {
      userId: "",
      role: "learner",
    });

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
