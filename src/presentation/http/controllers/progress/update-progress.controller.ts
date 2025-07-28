import { IUpdateProgressUseCase } from "../../../../app/usecases/progress";
import {
  UpdateProgressBodySchema,
  UpdateProgressPathSchema,
} from "../../../../domain/dtos/progress";
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
export class UpdateProgressController implements IController {
  constructor(
    private updateProgressUseCase: IUpdateProgressUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = UpdateProgressPathSchema.safeParse(
      httpRequest.path ?? {}
    );
    const bodyValidation = UpdateProgressBodySchema.safeParse(
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

    const { progressId } = pathValidation.data;
    const { userId, role, materialId } = bodyValidation.data;

    const response = await this.updateProgressUseCase.execute(
      { progressId, materialId },
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
