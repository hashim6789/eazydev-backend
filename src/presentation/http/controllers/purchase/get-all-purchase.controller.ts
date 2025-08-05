import { IGetAllPurchaseUseCase } from "../../../../app/usecases/purchase/interfaces";
import {
  GetAllPurchasesBodySchema,
  PaginationSchema,
  PayloadSchema,
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
export class GetAllPurchaseController implements IController {
  constructor(
    private _getAllPurchaseUseCase: IGetAllPurchaseUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const queryValidation = PaginationSchema.safeParse(httpRequest.query ?? {});
    const userValidation = PayloadSchema.safeParse(httpRequest.body ?? {});

    if (!queryValidation.success || !userValidation.success) {
      const queryError = !queryValidation.success
        ? extractFirstZodMessage(queryValidation.error)
        : null;
      const userError = !userValidation.success
        ? extractFirstZodMessage(userValidation.error)
        : null;
      const errorMessage = queryError || userError || "Invalid request";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const query = queryValidation.data;
    const { userId, role } = userValidation.data;

    const response = await this._getAllPurchaseUseCase.execute(query, {
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
