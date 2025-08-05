import { IRecoverUserInformationUseCase } from "../../../../app/usecases/refresh/interfaces/recover-user-info.usecase";
import { ResendOtpBodySchema } from "../../../../domain/dtos";

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
    private _recoverUserInformationUserUserCase: IRecoverUserInformationUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  /**
   * Handles an HTTP request to recover user information using a refresh token.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = ResendOtpBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const errorMessage =
        extractFirstZodMessage(bodyValidation.error) || "Invalid input";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId } = bodyValidation.data;

    const response = await this._recoverUserInformationUserUserCase.execute({
      userId,
    });

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
