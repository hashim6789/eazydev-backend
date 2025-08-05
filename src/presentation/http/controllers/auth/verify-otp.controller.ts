import { IVerifyOtpUseCase } from "../../../../app/usecases/auth/interfaces/verify-otp.usecase";
import { VerifyOtpRequestSchema } from "../../../../domain/dtos";
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
export class VerifyOtpController implements IController {
  constructor(
    private _verifyOtpCase: IVerifyOtpUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const validation = VerifyOtpRequestSchema.safeParse(httpRequest.body);

    if (!validation.success) {
      const firstErrorMessage = extractFirstZodMessage(validation.error); // you’ve already built this
      const error = this._httpErrors.error_422(firstErrorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const verifyOtpRequestDTO = validation.data;
    const response = await this._verifyOtpCase.execute(verifyOtpRequestDTO);

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
