import { IUpdateMaterialUseCase } from "../../../../app/usecases/material";
import {
  UpdateMaterialBodySchema,
  UpdateMaterialPathSchema,
} from "../../../../domain/dtos/material";
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
export class UpdateMaterialController implements IController {
  constructor(
    private updateMaterialUseCase: IUpdateMaterialUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = UpdateMaterialPathSchema.safeParse(
      httpRequest.path ?? {}
    );
    const bodyValidation = UpdateMaterialBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!pathValidation.success || !bodyValidation.success) {
      const pathError = !pathValidation.success
        ? extractFirstZodMessage(pathValidation.error)
        : null;
      const bodyError = !bodyValidation.success
        ? extractFirstZodMessage(bodyValidation.error)
        : null;

      const errorMessage = pathError || bodyError || "Invalid input";
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { materialId } = pathValidation.data;
    const { userId, role, title, description, type, fileKey, duration } =
      bodyValidation.data;

    const response = await this.updateMaterialUseCase.execute(
      {
        title,
        description,
        mentorId: userId, // derived from userId
        type,
        fileKey,
        duration,
        materialId,
      },
      { userId, role }
    );

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
