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
    const bodyValidation = ResendOtpBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const errorMessage =
        extractFirstZodMessage(bodyValidation.error) || "Invalid input";
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId } = bodyValidation.data;

    const response = await this.recoverUserInformationUserUserCase.execute({
      userId,
    });

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
