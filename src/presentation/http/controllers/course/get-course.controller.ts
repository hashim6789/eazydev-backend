import { IGetCourseUseCase } from "../../../../app/usecases/course";
import { GetCoursePathSchema } from "../../../../domain/dtos";
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
export class GetCourseController implements IController {
  constructor(
    private getCourseCase: IGetCourseUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = GetCoursePathSchema.safeParse(
      httpRequest.path ?? {}
    );

    if (!pathValidation.success) {
      const firstError = extractFirstZodMessage(pathValidation.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { courseId } = pathValidation.data;
    const response = await this.getCourseCase.execute(courseId);

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
