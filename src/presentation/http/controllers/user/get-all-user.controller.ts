import { IGetAllUserUseCase } from "../../../../app/usecases/user/interfaces/get-all-user.usecase";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { QueryUser } from "../../../../domain/dtos/user";
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
 * Controller for handling requests to getAll a user.
 */
export class GetAllUserController implements IController {
  constructor(
    private getAllUserCase: IGetAllUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryParams = Object.keys(httpRequest.query);

      if (
        queryParams.includes("role") &&
        queryParams.includes("status") &&
        queryParams.includes("search") &&
        queryParams.includes("page") &&
        queryParams.includes("limit")
      ) {
        const query = httpRequest.query as QueryUser;

        response = await this.getAllUserCase.execute(query);
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
