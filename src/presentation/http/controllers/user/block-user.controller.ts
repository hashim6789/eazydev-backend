import { IBlockUserUseCase } from "../../../../app/usecases/user/interfaces/block-user.usecase";
import { IGetUserUseCase } from "../../../../app/usecases/user/interfaces/get-user.uscase";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { SignupRole } from "../../../../domain/types/user";
import {
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
} from "../../helpers/implementations";
import { IController } from "../IController";

/**
 * Controller for handling requests to getAll a user.
 */
export class BlockUserController implements IController {
  constructor(
    private blockUserCase: IBlockUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.body &&
      httpRequest.path &&
      Object.keys(httpRequest.body) &&
      Object.keys(httpRequest.path).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body);
      const pathParams = Object.keys(httpRequest.path);

      if (bodyParams.includes("change") && pathParams.includes("userId")) {
        const { userId } = httpRequest.path as { userId: string };
        const { change } = httpRequest.body as { change: boolean };

        response = await this.blockUserCase.execute({ userId, change });
      } else {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
