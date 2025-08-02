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
    private getAllCourseCase: IGetAllCourseUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
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
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const query = queryValidation.data;

    const response = await this.getAllCourseCase.execute(query, {
      userId: "",
      role: "learner",
    });

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
