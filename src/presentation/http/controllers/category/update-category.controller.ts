import { IUpdateCategoryUseCase } from "../../../../app/usecases/category";
import {
  IUpdateCategoryRequestDTO,
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
 * Controller for handling requests to create a Category.
 */
export class updateCategoryController implements IController {
  constructor(
    private updateCategoryUseCase: IUpdateCategoryUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.body &&
      httpRequest.path &&
      Object.keys(httpRequest.path).length > 0 &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body);
      const pathParams = Object.keys(httpRequest.path);

      if (
        pathParams.includes("categoryId") &&
        bodyParams.includes("title") &&
        bodyParams.includes("adminId") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const { userId, role, title, adminId } = httpRequest.body as Payload &
          IUpdateCategoryRequestDTO;
        const { categoryId } = httpRequest.path as { categoryId: string };
        response = await this.updateCategoryUseCase.execute(
          {
            title,
            adminId,
            categoryId,
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
