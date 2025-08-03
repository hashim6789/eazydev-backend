import { IUpdateLessonUseCase } from "../../../../app/usecases/lesson";
import {
  UpdateLessonBodySchema,
  UpdateLessonPathSchema,
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
 * Controller for handling requests to update lesson .
 */
export class UpdateLessonController implements IController {
  constructor(
    private updateLessonUseCase: IUpdateLessonUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = UpdateLessonPathSchema.safeParse(
      httpRequest.path ?? {}
    );
    const bodyValidation = UpdateLessonBodySchema.safeParse(
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
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { lessonId } = pathValidation.data;
    const { userId, role, courseId, mentorId, title, description, materials } =
      bodyValidation.data;

    const response = await this.updateLessonUseCase.execute(
      { id: lessonId, courseId, title, description, mentorId, materials },
      { userId, role }
    );

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
