import { IGetUserDataUseCase } from "../../../../app/usecases/user";
import { IGetUserUseCase } from "../../../../app/usecases/user/interfaces/get-user.uscase";
import { IGetUserDataRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { SignupRole } from "../../../../domain/types/user";
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import { IController } from "../IController";

/**
 * Controller for handling requests to getAll a user.
 */
export class GetUserDataController implements IController {
  constructor(
    private getUserDataCase: IGetUserDataUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.path &&
      httpRequest.query &&
      Object.keys(httpRequest.path).length > 0 &&
      Object.keys(httpRequest.query).length > 0
    ) {
      const pathParams = Object.keys(httpRequest.path);
      const queryParams = Object.keys(httpRequest.query);

      if (pathParams.includes("id") && queryParams.includes("userRole")) {
        const { id } = httpRequest.path as Pick<IGetUserDataRequestDTO, "id">;
        const { userRole } = httpRequest.query as Pick<
          IGetUserDataRequestDTO,
          "userRole"
        >;

        response = await this.getUserDataCase.execute({ id, userRole });
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
