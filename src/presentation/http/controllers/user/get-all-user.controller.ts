import { IGetAllUserUseCase } from "../../../../app/usecases/user/interfaces/get-all-user.usecase";
import { GetAllUserQuerySchema } from "../../../../domain/dtos/user";
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
export class GetAllUserController implements IController {
  constructor(
    private _getAllUserCase: IGetAllUserUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const queryValidation = GetAllUserQuerySchema.safeParse(
      httpRequest.query ?? {}
    );

    if (!queryValidation.success) {
      const errorMessage =
        extractFirstZodMessage(queryValidation.error) || "Invalid input";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const query = queryValidation.data;

    const response = await this._getAllUserCase.execute(query);

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
