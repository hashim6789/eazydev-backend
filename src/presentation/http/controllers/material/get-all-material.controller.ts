import { IGetAllMaterialUseCase } from "../../../../app/usecases/material";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { QueryMaterial } from "../../../../domain/dtos/material/material";
import { ResponseDTO } from "../../../../domain/dtos/response";
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
 * Controller for handling requests to create a user.
 */
export class GetAllMaterialController implements IController {
  constructor(
    private getAllMaterialUseCase: IGetAllMaterialUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.query &&
      httpRequest.body &&
      Object.keys(httpRequest.query).length > 0 &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const queryParams = Object.keys(httpRequest.query);
      const bodyParams = Object.keys(httpRequest.body);

      if (
        queryParams.includes("type") &&
        queryParams.includes("search") &&
        queryParams.includes("page") &&
        queryParams.includes("limit") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const query = httpRequest.query as QueryMaterial;

        const { userId, role } = httpRequest.body as Payload;
        response = await this.getAllMaterialUseCase.execute({
          query,
          userId,
          role,
        });
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
