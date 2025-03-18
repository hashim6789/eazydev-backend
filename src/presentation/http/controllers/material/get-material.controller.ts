import { IGetMaterialUseCase } from "../../../../app/usecases/material/interface/get-material.usecase";
import { Payload } from "../../../../domain/dtos/jwt-payload";
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
export class GetMaterialController implements IController {
  constructor(
    private getMaterialUseCase: IGetMaterialUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.path &&
      httpRequest.body &&
      Object.keys(httpRequest.path).length > 0 &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const pathParams = Object.keys(httpRequest.path);
      const bodyParams = Object.keys(httpRequest.body);

      if (
        pathParams.includes("materialId") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const { materialId } = httpRequest.path as { materialId: string };

        const { userId, role } = httpRequest.body as Payload;
        response = await this.getMaterialUseCase.execute({
          materialId,
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
