import { ICreateCourseUseCase } from "../../../../app/usecases/course";
import {
  ICreateCourseRequestDTO,
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
export class CreateCourseController implements IController {
  constructor(
    private createCourseUseCase: ICreateCourseUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
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
        bodyParams.includes("categoryId") &&
        bodyParams.includes("thumbnail") &&
        bodyParams.includes("price") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const {
          userId,
          role,
          title,
          description,
          mentorId,
          categoryId,
          thumbnail,
          price,
        } = httpRequest.body as Payload & ICreateCourseRequestDTO;
        response = await this.createCourseUseCase.execute(
          {
            title,
            description,
            mentorId,
            categoryId,
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

      const success = this.httpSuccess.success_201(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
