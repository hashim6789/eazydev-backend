import { IUpdateCourseUseCase } from "../../../../app/usecases/course";
import {
  IUpdateCourseRequestDTO,
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
 * Controller for handling requests to create a Course.
 */
export class UpdateCourseController implements IController {
  constructor(
    private updateCourseUseCase: IUpdateCourseUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.body &&
      httpRequest.path &&
      Object.keys(httpRequest.body).length > 0 &&
      Object.keys(httpRequest.path).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body);
      const pathParams = Object.keys(httpRequest.path);

      if (
        bodyParams.includes("title") &&
        bodyParams.includes("description") &&
        bodyParams.includes("mentorId") &&
        bodyParams.includes("categoryId") &&
        bodyParams.includes("thumbnail") &&
        bodyParams.includes("price") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role") &&
        pathParams.includes("courseId")
      ) {
        const {
          userId,
          role,
          mentorId,
          title,
          categoryId,
          description,
          thumbnail,
          price,
        } = httpRequest.body as Payload &
          Omit<IUpdateCourseRequestDTO, "courseId">;
        const { courseId } = httpRequest.path as Pick<
          IUpdateCourseRequestDTO,
          "courseId"
        >;

        response = await this.updateCourseUseCase.execute(
          {
            courseId,
            mentorId,
            title,
            categoryId,
            description,
            thumbnail,
            price,
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

      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
