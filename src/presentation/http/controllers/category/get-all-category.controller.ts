import { IGetAllCategoryUseCase } from "../../../../app/usecases/category";
import { Payload, ResponseDTO, RoleSchema } from "../../../../domain/dtos";
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
 * Controller for handling requests to getAll category.
 */
export class GetAllCategoryController implements IController {
  constructor(
    private getAllCategoryCase: IGetAllCategoryUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const validation = RoleSchema.safeParse(httpRequest.body ?? {});

    if (!validation.success) {
      const firstError = extractFirstZodMessage(validation.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { role } = validation.data;
    const response = await this.getAllCategoryCase.execute(role);

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
