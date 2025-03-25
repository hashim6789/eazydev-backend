import { IVerifyOtpUseCase } from "../../../../app/usecases/auth/interfaces/verify-otp.usecase";
import { IVerifyOtpRequestDTO } from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { IHttpErrors } from "../../helpers/IHttpErrors";
import { IHttpRequest } from "../../helpers/IHttpRequest";
import { IHttpResponse } from "../../helpers/IHttpResponse";
import { IHttpSuccess } from "../../helpers/IHttpSuccess";
import { HttpErrors } from "../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../helpers/implementations/HttpSuccess";
import { IController } from "../IController";

/**
 * Controller for handling requests to create a user.
 */
export class VerifyOtpController implements IController {
  constructor(
    private verifyOtpCase: IVerifyOtpUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (bodyParams.includes("otp") && bodyParams.includes("userId")) {
        const verifyOtpRequestDTO = httpRequest.body as IVerifyOtpRequestDTO;

        response = await this.verifyOtpCase.execute(verifyOtpRequestDTO);
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
