import { IGetAllUserUseCase } from "../../../../../app/usecases/user/get-all-user.usecase";
import { ResponseDTO } from "../../../../../domain/dtos/response.dtos";
import { IHttpErrors } from "../../../helpers/IHttpErrors";
import { IHttpRequest } from "../../../helpers/IHttpRequest";
import { IHttpResponse } from "../../../helpers/IHttpResponse";
import { IHttpSuccess } from "../../../helpers/IHttpSuccess";
import { HttpErrors } from "../../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../../helpers/implementations/HttpSuccess";
import { IController } from "../../../IController";

/**
 * Controller for handling requests to getAll a user.
 */
export class GetAllUserController implements IController {
  constructor(
    private getAllUserCase: IGetAllUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryParams = Object.keys(httpRequest.query);

      if (queryParams.includes("page")) {
        const page = (httpRequest.query as { page: string }).page;

        response = await this.getAllUserCase.execute(Number(page));
      } else {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_201(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
