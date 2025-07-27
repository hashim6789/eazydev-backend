import { ISignupUseCase } from "../../../../app/usecases/auth/interfaces/signup-auth.usecase";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { SignupRole } from "../../../../domain/types/user";
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
export class SignupController implements IController {
  constructor(
    private signupCase: ISignupUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (
        bodyParams.includes("firstName") &&
        bodyParams.includes("lastName") &&
        bodyParams.includes("email") &&
        bodyParams.includes("role") &&
        bodyParams.includes("password")
      ) {
        const signupRequestDTO = httpRequest.body as {
          firstName: string;
          lastName: string;
          email: string;
          role: SignupRole;
          password: string;
        };

        response = await this.signupCase.execute(signupRequestDTO);
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
