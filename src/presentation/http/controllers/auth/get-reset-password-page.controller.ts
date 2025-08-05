import { IGetResetPageUseCase } from "../../../../app/usecases/auth";
import {
  GetResetPageRequestSchema,
  IGetResetPageRequestDTO,
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
export class GetResetPasswordPageController implements IController {
  constructor(
    private _getResetPageUseCase: IGetResetPageUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const path = httpRequest.path as Pick<IGetResetPageRequestDTO, "tokenId">;
    const query = httpRequest.query as Pick<IGetResetPageRequestDTO, "role">;

    if (!path.tokenId || !query.role) {
      const error = this._httpErrors.error_422("Missing tokenId or role");
      return new HttpResponse(error.statusCode, error.body);
    }

    const validation = GetResetPageRequestSchema.safeParse({
      tokenId: path.tokenId,
      role: query.role,
    });

    if (!validation.success) {
      const firstErrorMessage = extractFirstZodMessage(validation.error);
      const error = this._httpErrors.error_422(firstErrorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const getResetPageRequestDTO: IGetResetPageRequestDTO = validation.data;
    const response = await this._getResetPageUseCase.execute(
      getResetPageRequestDTO
    );

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
