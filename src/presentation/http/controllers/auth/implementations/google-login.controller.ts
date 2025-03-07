import { IGoogleLoginUseCase } from "../../../../../app/usecases/auth/google-login.usecase";
import { IGoogleRequestDTO } from "../../../../../domain/dtos/auth/google-auth.dto";
import { ResponseDTO } from "../../../../../domain/dtos/response.dtos";
import { IHttpErrors } from "../../../helpers/IHttpErrors";
import { IHttpRequest } from "../../../helpers/IHttpRequest";
import { IHttpResponse } from "../../../helpers/IHttpResponse";
import { IHttpSuccess } from "../../../helpers/IHttpSuccess";
import { HttpErrors } from "../../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../../helpers/implementations/HttpSuccess";
import { IController } from "../../IController";

/**
 * Controller for handling requests to create a user.
 */
export class GoogleLoginController implements IController {
  constructor(
    private googleLoginCase: IGoogleLoginUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    console.log("object");

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (bodyParams.includes("googleToken") && bodyParams.includes("role")) {
        const googleLoginRequestDTO = httpRequest.body as IGoogleRequestDTO;

        response = await this.googleLoginCase.execute(googleLoginRequestDTO);
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
