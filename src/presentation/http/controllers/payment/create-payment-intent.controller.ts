import { IGetAllCategoryAdminUseCase } from "../../../../app/usecases/category";
import {
  IGetAllCourseUseCase,
  IGetCourseUseCase,
} from "../../../../app/usecases/course";
import { ICreatePaymentIntentUseCase } from "../../../../app/usecases/payment/interfaces";
import {
  QueryCategory,
  QueryCourse,
  ResponseDTO,
} from "../../../../domain/dtos";
import {
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
} from "../../helpers/implementations";
import { IController } from "../IController";

/**
 * Controller for handling requests to getAll category.
 */
export class CreatePaymentIntentController implements IController {
  constructor(
    private createPaymentIntentUseCase: ICreatePaymentIntentUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (bodyParams.includes("courseId") && bodyParams.includes("type")) {
        const { courseId, type } = httpRequest.body as {
          courseId: string;
          type: string;
        };

        response = await this.createPaymentIntentUseCase.execute(courseId);
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
