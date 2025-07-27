import { IRecoverUserInformationUseCase } from "../../../../app/usecases/refresh/interfaces/recover-user-info.usecase";
import { IResendOtpRequestDTO } from "../../../../domain/dtos/auth/resend-otp-auth.dto";
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
 * Controller for handling requests to recover user information using a refresh token.
 */
export class RecoverUserInformationUserController implements IController {
  /**
   * Creates an instance of RecoverUserInformationUserController.
   * @param recoverUserInformationUserUserCase The use case for recovering user information.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private recoverUserInformationUserUserCase: IRecoverUserInformationUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  /**
   * Handles an HTTP request to recover user information using a refresh token.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (bodyParams.includes("userId")) {
        // Extract refresh token ID from the query parameters
        // const refreshTokenId = httpRequest.query as IRefreshTokenUserDTO;

        const userId = httpRequest.body as IResendOtpRequestDTO;

        // Execute the recover user information use case
        response = await this.recoverUserInformationUserUserCase.execute(
          userId
        );
      } else {
        // Invalid query parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        // User information recovery failed, return a 400 Bad Request error
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      // User information recovery succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    // Invalid query parameters, return a 500 Internal Server Error
    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
