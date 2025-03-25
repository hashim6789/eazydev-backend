import { IMaterialContentUploadUseCase } from "../../../../app/usecases/upload/interface/material-conent-upload.usecase";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUploadMaterialRequestDTO } from "../../../../domain/dtos/upload";
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
export class UploadMaterialContentController implements IController {
  constructor(
    private materialContentUploadUseCase: IMaterialContentUploadUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (
        bodyParams.includes("fileName") &&
        bodyParams.includes("fileType") &&
        bodyParams.includes("materialType") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const { fileName, fileType, materialType, userId, role } =
          httpRequest.body as IUploadMaterialRequestDTO & Payload;

        response = await this.materialContentUploadUseCase.execute(
          { fileName, fileType, materialType },
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
