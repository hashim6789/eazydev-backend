import { IGetUserDataUseCase } from "../../../../app/usecases/user";
import { GetUserPathSchema, GetUserQuerySchema } from "../../../../domain/dtos";
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
 * Controller for handling requests to getAll a user.
 */
export class GetUserDataController implements IController {
  constructor(
    private getUserDataCase: IGetUserDataUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const queryValidation = GetUserQuerySchema.safeParse(
      httpRequest.query ?? {}
    );
    const pathValidation = GetUserPathSchema.safeParse(httpRequest.path ?? {});

    if (!queryValidation.success || !pathValidation.success) {
      const queryMsg = queryValidation.success
        ? null
        : extractFirstZodMessage(queryValidation.error);
      const pathMsg = pathValidation.success
        ? null
        : extractFirstZodMessage(pathValidation.error);
      const errorMessage = queryMsg ?? pathMsg ?? "Invalid input";
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userRole } = queryValidation.data;
    const { id } = pathValidation.data;

    const response = await this.getUserDataCase.execute({ id, userRole });

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
