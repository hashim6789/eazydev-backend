import {
  ICreateMaterialUseCase,
  IUpdateMaterialUseCase,
} from "../../../../app/usecases/material";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import {
  ICreateMaterialRequestDTO,
  IUpdateMaterialRequestDTO,
} from "../../../../domain/dtos/material";
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
export class UpdateMaterialController implements IController {
  constructor(
    private updateMaterialUseCase: IUpdateMaterialUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0 &&
      httpRequest.path &&
      Object.keys(httpRequest.path).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body);
      const pathParams = Object.keys(httpRequest.path);

      if (
        pathParams.includes("materialId") &&
        bodyParams.includes("title") &&
        bodyParams.includes("description") &&
        bodyParams.includes("type") &&
        bodyParams.includes("fileKey") &&
        bodyParams.includes("duration") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const { userId, role, title, description, type, fileKey, duration } =
          httpRequest.body as Payload &
            Omit<IUpdateMaterialRequestDTO, "mentorId" | "materialId">;
        const { materialId } = httpRequest.path as Pick<
          IUpdateMaterialRequestDTO,
          "materialId"
        >;

        response = await this.updateMaterialUseCase.execute(
          {
            title,
            description,
            mentorId: userId,
            type,
            fileKey,
            duration,
            materialId,
          },
          { userId, role }
        );
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
