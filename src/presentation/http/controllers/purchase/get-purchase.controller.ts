import { IGetPurchaseUseCase } from "../../../../app/usecases/purchase/interfaces";
import {
  GetPurchaseBodySchema,
  GetPurchasePathSchema,
  IGetPurchaseRequestDTO,
} from "../../../../domain/dtos";
import { Payload } from "../../../../domain/dtos/jwt-payload";

import { ResponseDTO } from "../../../../domain/dtos/response";
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
export class GetPurchaseController implements IController {
  constructor(
    private _getPurchaseUseCase: IGetPurchaseUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = GetPurchasePathSchema.safeParse(
      httpRequest.path ?? {}
    );
    const bodyValidation = GetPurchaseBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!pathValidation.success || !bodyValidation.success) {
      const pathError = !pathValidation.success
        ? extractFirstZodMessage(pathValidation.error)
        : null;
      const bodyError = !bodyValidation.success
        ? extractFirstZodMessage(bodyValidation.error)
        : null;
      const errorMessage = pathError || bodyError || "Invalid input";

      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { id } = pathValidation.data;
    const { userId, role } = bodyValidation.data;

    const response = await this._getPurchaseUseCase.execute(
      { id },
      { userId, role }
    );

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
