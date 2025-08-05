import { IGetAllCategoryAdminUseCase } from "../../../../app/usecases/category";
import {
  CategoryQuerySchema,
  QueryCategory,
  ResponseDTO,
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
 * Controller for handling requests to getAll category.
 */
export class GetAllCategoryAdminController implements IController {
  constructor(
    private _getAllCategoryAdminCase: IGetAllCategoryAdminUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const validation = CategoryQuerySchema.safeParse(httpRequest.query);

    if (!validation.success) {
      const firstError = extractFirstZodMessage(validation.error);
      const error = this._httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const query = validation.data;
    const response = await this._getAllCategoryAdminCase.execute(query);

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
