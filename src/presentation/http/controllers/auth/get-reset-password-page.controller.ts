import { IGetResetPageUseCase } from "../../../../app/usecases/auth";
import { IGetResetPageRequestDTO } from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
import { ResponseDTO } from "../../../../domain/dtos/response";
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
 * Controller for handling requests to create a user.
 */
export class GetResetPasswordPageController implements IController {
  constructor(
    private getResetPageUseCase: IGetResetPageUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.path &&
      Object.keys(httpRequest.path).length > 0 &&
      httpRequest.query &&
      Object.keys(httpRequest.query).length > 0
    ) {
      const pathParams = Object.keys(httpRequest.path);
      const queryParams = Object.keys(httpRequest.query);

      if (pathParams.includes("tokenId") && queryParams.includes("role")) {
        const { tokenId } = httpRequest.path as Pick<
          IGetResetPageRequestDTO,
          "tokenId"
        >;
        const { role } = httpRequest.query as Pick<
          IGetResetPageRequestDTO,
          "role"
        >;

        response = await this.getResetPageUseCase.execute({ tokenId, role });
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
