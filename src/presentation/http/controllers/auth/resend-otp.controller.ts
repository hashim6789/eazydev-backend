import { IResendOtpUseCase } from "../../../../app/usecases/auth/interfaces/resend-otp-usecase";
import {
  IResendOtpRequestDTO,
  ResendOtpRequestSchema,
} from "../../../../domain/dtos";

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
export class ResendOtpController implements IController {
  constructor(
    private _resendOtpUseCase: IResendOtpUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const validation = ResendOtpRequestSchema.safeParse(httpRequest.body);

    if (!validation.success) {
      const firstErrorMessage = extractFirstZodMessage(validation.error); // assumes you have this helper
      const error = this._httpErrors.error_422(firstErrorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const resendOtpRequestDTO: IResendOtpRequestDTO = validation.data;
    const response = await this._resendOtpUseCase.execute(resendOtpRequestDTO);

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
