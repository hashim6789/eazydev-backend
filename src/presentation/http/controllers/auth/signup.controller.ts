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
    private _signupCase: ISignupUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (!httpRequest.body || Object.keys(httpRequest.body).length === 0) {
      error = this._httpErrors.error_500();
      return new HttpResponse(error.statusCode, error.body);
    }

    const validation = SignupRequestSchema.safeParse(httpRequest.body);
    if (!validation.success) {
      const firstErrorMessage = extractFirstZodMessage(validation.error);
      error = this._httpErrors.error_422(firstErrorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const signupRequestDTO = validation.data;
    response = await this._signupCase.execute(signupRequestDTO);

    if (!response.success) {
      error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
