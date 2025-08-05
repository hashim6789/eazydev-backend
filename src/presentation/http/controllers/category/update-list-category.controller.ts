import { IUpdateListCategoryUseCase } from "../../../../app/usecases/category";
import {
  CategoryPathSchema,
  IUpdateListCategoryRequestDTO,
  Payload,
  ResponseDTO,
  UpdateListCategorySchema,
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
 * Controller for handling requests to update list Category.
 */
export class UpdateListCategoryController implements IController {
  constructor(
    private _createCategoryUseCase: IUpdateListCategoryUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = UpdateListCategorySchema.safeParse(
      httpRequest.body ?? {}
    );
    const pathValidation = CategoryPathSchema.safeParse(httpRequest.path ?? {});

    if (!bodyValidation.success) {
      const firstError = extractFirstZodMessage(bodyValidation.error);
      const error = this._httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    if (!pathValidation.success) {
      const firstError = extractFirstZodMessage(pathValidation.error);
      const error = this._httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { change, adminId, userId, role } = bodyValidation.data;

    const { categoryId } = pathValidation.data;

    const response = await this._createCategoryUseCase.execute(
      { categoryId, change, adminId },
      { userId, role }
    );

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
