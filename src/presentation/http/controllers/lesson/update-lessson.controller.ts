import {
  IGetLessonUseCase,
  IUpdateLessonUseCase,
} from "../../../../app/usecases/lesson";
import {
  IUpdateLessonRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
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
 * Controller for handling requests to update lesson .
 */
export class UpdateLessonController implements IController {
  constructor(
    private updateLessonUseCase: IUpdateLessonUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
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
        pathParams.includes("lessonId") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role") &&
        bodyParams.includes("courseId") &&
        bodyParams.includes("mentorId") &&
        bodyParams.includes("title") &&
        bodyParams.includes("description") &&
        bodyParams.includes("materials")
      ) {
        const { lessonId } = httpRequest.path as { lessonId: string };
        const {
          userId,
          role,
          courseId,
          title,
          description,
          mentorId,
          materials,
        } = httpRequest.body as Payload & Omit<IUpdateLessonRequestDTO, "id">;

        response = await this.updateLessonUseCase.execute(
          { id: lessonId, courseId, title, description, mentorId, materials },
          { userId, role }
        );
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
