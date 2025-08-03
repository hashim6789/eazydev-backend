import { IJoinMeetingUseCase } from "../../../../app/usecases/meeting/interfaces";
import {
  JoinMeetingBodySchema,
  JoinMeetingPathSchema,
} from "../../../../domain/dtos";
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
 * Controller for handling requests to getAll category.
 */
export class JoinMeetingController implements IController {
  constructor(
    private joinMeetingUseCase: IJoinMeetingUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const pathValidation = JoinMeetingPathSchema.safeParse(
      httpRequest.path ?? {}
    );
    const bodyValidation = JoinMeetingBodySchema.safeParse(
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

    const { meetingId } = pathValidation.data;
    const { userId, role, peerId } = bodyValidation.data;

    const response = await this.joinMeetingUseCase.execute(
      { peerId, meetingId },
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
