import { IResetPasswordUseCase } from "../../../../app/usecases/auth";
import { IResetPasswordRequestDTO } from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
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
 * Controller for handling requests to create a user.
 */
export class ResetPasswordController implements IController {
  constructor(
    private resetPasswordUseCase: IResetPasswordUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (
        bodyParams.includes("tokenId") &&
        bodyParams.includes("role") &&
        bodyParams.includes("password")
      ) {
        const { tokenId, role, password } =
          httpRequest.body as IResetPasswordRequestDTO;

        response = await this.resetPasswordUseCase.execute({
          tokenId,
          role,
          password,
        });
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
