import { ICreateLessonUseCase } from "../../../../app/usecases/lesson";
import {
  ICreateLessonRequestDTO,
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
 * Controller for handling requests to create a user.
 */
export class CreateLessonController implements IController {
  constructor(
    private createLessonUseCase: ICreateLessonUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (
        bodyParams.includes("title") &&
        bodyParams.includes("description") &&
        bodyParams.includes("mentorId") &&
        bodyParams.includes("courseId") &&
        bodyParams.includes("materials") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const {
          userId,
          role,
          title,
          description,
          mentorId,
          materials,
          courseId,
        } = httpRequest.body as Payload & ICreateLessonRequestDTO;
        response = await this.createLessonUseCase.execute(
          {
            title,
            description,
            mentorId,
            courseId,
            materials,
          },
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

      const success = this.httpSuccess.success_201(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
