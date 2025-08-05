import { IMaterialContentUploadUseCase } from "../../../../app/usecases/upload/interface/material-conent-upload.usecase";
import { UploadMaterialRequestSchema } from "../../../../domain/dtos/upload";
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
 * Controller for handling requests to create a user.
 */
export class UploadMaterialContentController implements IController {
  constructor(
    private _materialContentUploadUseCase: IMaterialContentUploadUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = UploadMaterialRequestSchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const errorMessage =
        extractFirstZodMessage(bodyValidation.error) || "Invalid input";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { fileName, fileType, materialType, userId, role } =
      bodyValidation.data;

    const response = await this._materialContentUploadUseCase.execute(
      { fileName, fileType, materialType },
      { userId, role }
    );

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
