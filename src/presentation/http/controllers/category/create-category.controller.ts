import { ICreateCategoryUseCase } from "../../../../app/usecases/category";
import {
  ICreateCategoryRequestDTO,
  Payload,
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
 * Controller for handling requests to create a Category.
 */
export class CreateCategoryController implements IController {
  constructor(
    private createCategoryUseCase: ICreateCategoryUseCase,
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
        bodyParams.includes("adminId") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const { userId, role, title, adminId } = httpRequest.body as Payload &
          ICreateCategoryRequestDTO;
        response = await this.createCategoryUseCase.execute(
          {
            title,
            adminId,
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
