import { ISignupUseCase } from "../../../../app/usecases/auth/interfaces/signup-auth.usecase";
import { SignupRequestSchema } from "../../../../domain/dtos";
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
import { extractFirstZodMessage } from "../../utils";
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

    if (!httpRequest.body || Object.keys(httpRequest.body).length === 0) {
      error = this.httpErrors.error_500();
      return new HttpResponse(error.statusCode, error.body);
    }

    const validation = SignupRequestSchema.safeParse(httpRequest.body);
    if (!validation.success) {
      const firstErrorMessage = extractFirstZodMessage(validation.error);
      error = this.httpErrors.error_422(firstErrorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const signupRequestDTO = validation.data;
    response = await this.signupCase.execute(signupRequestDTO);

    if (!response.success) {
      error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
