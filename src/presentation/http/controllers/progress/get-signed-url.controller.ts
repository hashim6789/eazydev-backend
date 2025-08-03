import { IGetSignedUrlUseCase } from "../../../../app/usecases/progress";
import {
  SignedUrlBodySchema,
  SignedUrlPathSchema,
} from "../../../../domain/dtos/progress";
import { IController } from "../IController";
import {
  HttpResponse,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import { extractFirstZodMessage } from "../../utils";

/**
 * Controller for handling requests to create a user.
 */
export class GetSignedUrlController implements IController {
  constructor(
    private getSignedUrlUseCase: IGetSignedUrlUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = SignedUrlPathSchema.safeParse(
      httpRequest.path ?? {}
    );
    const bodyValidation = SignedUrlBodySchema.safeParse(
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
    const { userId, role, materialType, fileKey } = bodyValidation.data;

    const response = await this.getSignedUrlUseCase.execute(
      { progressId, materialType, fileKey },
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
