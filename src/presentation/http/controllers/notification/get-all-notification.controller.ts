import { IGetAllNotificationUseCase } from "../../../../app/usecases/notification/interfaces";
import { GetNotificationsBodySchema } from "../../../../domain/dtos";
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
 * Controller for handling requests to getAll notification.
 */
export class GetAllNotificationController implements IController {
  constructor(
    private getAllNotificationCase: IGetAllNotificationUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = GetNotificationsBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const firstError = extractFirstZodMessage(bodyValidation.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = bodyValidation.data;

    const response = await this.getAllNotificationCase.execute({
      recipientId: userId,
    });

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
