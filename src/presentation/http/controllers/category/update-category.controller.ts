import { IUpdateCategoryUseCase } from "../../../../app/usecases/category";
import {
  IUpdateCategoryRequestDTO,
  Payload,
  ResponseDTO,
  UpdateCategoryBodySchema,
  UpdateCategoryPathSchema,
} from "../../../../domain/dtos";
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
 * Controller for handling requests to create a Category.
 */
export class updateCategoryController implements IController {
  constructor(
    private _updateCategoryUseCase: IUpdateCategoryUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = UpdateCategoryBodySchema.safeParse(
      httpRequest.body ?? {}
    );
    const pathValidation = UpdateCategoryPathSchema.safeParse(
      httpRequest.path ?? {}
    );

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

    const { title, adminId, userId, role } = bodyValidation.data;

    const { categoryId } = pathValidation.data;

    const response = await this._updateCategoryUseCase.execute(
      { title, adminId, categoryId },
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
