import { IGetLearningContentsUseCase } from "../../../../app/usecases/progress";
import {
  LearningContentBodySchema,
  LearningContentPathSchema,
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
export class GetLearningContentController implements IController {
  constructor(
    private _getLearningContentUseCase: IGetLearningContentsUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = LearningContentBodySchema.safeParse(
      httpRequest.body ?? {}
    );
    const pathValidation = LearningContentPathSchema.safeParse(
      httpRequest.path ?? {}
    );

    if (!bodyValidation.success || !pathValidation.success) {
      const firstBodyError = !bodyValidation.success
        ? extractFirstZodMessage(bodyValidation.error)
        : null;
      const firstPathError = !pathValidation.success
        ? extractFirstZodMessage(pathValidation.error)
        : null;
      const errorMessage = firstBodyError ?? firstPathError ?? "Invalid input";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = bodyValidation.data;
    const { progressId } = pathValidation.data;

    const response = await this._getLearningContentUseCase.execute(
      { progressId },
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
