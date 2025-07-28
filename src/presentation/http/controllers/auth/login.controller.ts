import { ILoginUseCase } from "../../../../app/usecases/auth";
import { ILoginRequestDTO, LoginRequestSchema } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

import {
  HttpResponse,
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
export class LoginController implements IController {
  constructor(
    private loginCase: ILoginUseCase,
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

    const validation = LoginRequestSchema.safeParse(httpRequest.body);
    if (!validation.success) {
      const firstErrorMessage = extractFirstZodMessage(validation.error);
      error = this.httpErrors.error_422(firstErrorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const loginRequestDTO: ILoginRequestDTO = validation.data;
    response = await this.loginCase.execute(loginRequestDTO);

    if (!response.success) {
      error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
