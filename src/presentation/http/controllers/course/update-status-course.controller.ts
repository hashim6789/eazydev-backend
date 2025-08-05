import { IUpdateStatusCourseUseCase } from "../../../../app/usecases/course";
import {
  UpdateCourseStatusBodySchema,
  UpdateCourseStatusPathSchema,
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
 * Controller for handling requests to create a Course.
 */
export class UpdateStatusCourseController implements IController {
  constructor(
    private _updateStatusCourseUseCase: IUpdateStatusCourseUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = UpdateCourseStatusPathSchema.safeParse(
      httpRequest.path ?? {}
    );
    const bodyValidation = UpdateCourseStatusBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!pathValidation.success || !bodyValidation.success) {
      const pathError = !pathValidation.success
        ? extractFirstZodMessage(pathValidation.error)
        : null;
      const bodyError = !bodyValidation.success
        ? extractFirstZodMessage(bodyValidation.error)
        : null;
      const errorMessage = pathError || bodyError || "Invalid input";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { courseId } = pathValidation.data;
    const { userId, role, newStatus } = bodyValidation.data;

    const response = await this._updateStatusCourseUseCase.execute(
      { courseId, newStatus },
      { userId, role }
    );

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
