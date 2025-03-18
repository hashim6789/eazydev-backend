import {
  ICreateCategoryUseCase,
  IUpdateListCategoryUseCase,
} from "../../../../app/usecases/category";
import {
  ICreateCategoryRequestDTO,
  IUpdateListCategoryRequestDTO,
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
 * Controller for handling requests to update list Category.
 */
export class UpdateListCategoryController implements IController {
  constructor(
    private createCategoryUseCase: IUpdateListCategoryUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
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
        bodyParams.includes("change") &&
        bodyParams.includes("adminId") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const { userId, role, categoryId, change, adminId } =
          httpRequest.body as Payload & IUpdateListCategoryRequestDTO;
        response = await this.createCategoryUseCase.execute(
          {
            categoryId,
            change,
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
