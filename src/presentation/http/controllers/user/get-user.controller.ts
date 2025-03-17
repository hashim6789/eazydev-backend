import { IGetUserUseCase } from "../../../../app/usecases/user/get-user.uscase";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { SignupRole } from "../../../../domain/types/user";
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
 * Controller for handling requests to getAll a user.
 */
export class GetUserController implements IController {
  constructor(
    private getUserCase: IGetUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.query &&
      httpRequest.path &&
      Object.keys(httpRequest.query) &&
      Object.keys(httpRequest.path).length > 0
    ) {
      const queryParams = Object.keys(httpRequest.query);
      const pathParams = Object.keys(httpRequest.path);

      if (queryParams.includes("role") && pathParams.includes("userId")) {
        const { userId } = httpRequest.path as { userId: string };
        const { role } = httpRequest.query as { role: SignupRole };

        response = await this.getUserCase.execute({ userId, role });
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
