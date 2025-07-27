import { IForgotPasswordUseCase } from "../../../../app/usecases/auth";
import { IForgotPasswordRequestDTO } from "../../../../domain/dtos";
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
export class ForgotPasswordController implements IController {
  constructor(
    private forgotPasswordCase: IForgotPasswordUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (bodyParams.includes("email") && bodyParams.includes("role")) {
        const forgotPasswordRequestDTO =
          httpRequest.body as IForgotPasswordRequestDTO;

        response = await this.forgotPasswordCase.execute(
          forgotPasswordRequestDTO
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
