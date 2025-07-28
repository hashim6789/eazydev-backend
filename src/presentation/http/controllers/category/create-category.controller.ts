import { ICreateCategoryUseCase } from "../../../../app/usecases/category";
import {
  CreateCategorySchema,
  ICreateCategoryRequestDTO,
  Payload,
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
 * Controller for handling requests to create a Category.
 */
export class CreateCategoryController implements IController {
  constructor(
    private createCategoryUseCase: ICreateCategoryUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const validation = CreateCategorySchema.safeParse(httpRequest.body);

    if (!validation.success) {
      const firstError = extractFirstZodMessage(validation.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { title, adminId, userId, role } = validation.data;

    const response = await this.createCategoryUseCase.execute(
      { title, adminId },
      { userId, role }
    );

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
