import { ICreateMaterialUseCase } from "../../../../app/usecases/material";
import { CreateMaterialBodySchema } from "../../../../domain/dtos/material";
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
export class CreateMaterialController implements IController {
  constructor(
    private createMaterialUseCase: ICreateMaterialUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = CreateMaterialBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const firstError = extractFirstZodMessage(bodyValidation.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const {
      userId,
      role,
      title,
      description,
      type,
      fileKey,
      duration,
      // lessonId, // optional
    } = bodyValidation.data;

    const response = await this.createMaterialUseCase.execute(
      {
        title,
        description,
        mentorId: userId, // derived
        type,
        fileKey,
        duration,
        // lessonId,
      },
      { userId, role }
    );

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
