import { IChangePasswordUseCase } from "../../../../app/usecases/user";
import { IChangePasswordRequestDTO, Payload } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";
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
export class ChangePasswordController implements IController {
  constructor(
    private changePasswordUseCase: IChangePasswordUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (
        bodyParams.includes("role") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("newPassword")
      ) {
        const { userId, role, newPassword } = httpRequest.body as Payload &
          IChangePasswordRequestDTO;

        response = await this.changePasswordUseCase.execute(
          { newPassword },
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
