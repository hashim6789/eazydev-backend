import { IUpdateCourseUseCase } from "../../../../app/usecases/course";
import {
  UpdateCourseBodySchema,
  UpdateCoursePathSchema,
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
export class UpdateCourseController implements IController {
  constructor(
    private _updateCourseUseCase: IUpdateCourseUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = UpdateCoursePathSchema.safeParse(
      httpRequest.path ?? {}
    );
    const bodyValidation = UpdateCourseBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!pathValidation.success || !bodyValidation.success) {
      const pathError = !pathValidation.success
        ? extractFirstZodMessage(pathValidation.error)
        : null;
      const bodyError = !bodyValidation.success
        ? extractFirstZodMessage(bodyValidation.error)
        : null;
      const errorMessage = bodyError || pathError || "Invalid input data";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { courseId } = pathValidation.data;
    const {
      userId,
      role,
      mentorId,
      title,
      description,
      categoryId,
      thumbnail,
      price,
    } = bodyValidation.data;

    const response = await this._updateCourseUseCase.execute(
      { courseId, mentorId, title, description, categoryId, thumbnail, price },
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
