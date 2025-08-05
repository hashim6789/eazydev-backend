import { IRefreshTokenUserUseCase } from "../../../../app/usecases/refresh/interfaces/refresh-token.usecas";
import { RefreshTokenPayloadSchema } from "../../../../domain/dtos";
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
 * Controller for handling requests to refresh authentication tokens.
 */
export class RefreshTokenUserController implements IController {
  /**
   * Creates an instance of TokenUserController.
   * @param refreshTokenUserUserCase The use case for refreshing authentication tokens.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private _refreshTokenUserUserCase: IRefreshTokenUserUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  /**
   * Handles an HTTP request to refresh authentication tokens.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = RefreshTokenPayloadSchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const errorMessage =
        extractFirstZodMessage(bodyValidation.error) || "Invalid input";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = bodyValidation.data;

    const response = await this._refreshTokenUserUserCase.execute({
      userId,
      role,
    });

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
