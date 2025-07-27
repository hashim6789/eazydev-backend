import { IGetAllNotificationUseCase } from "../../../../app/usecases/notification/interfaces";
import { Payload, ResponseDTO } from "../../../../domain/dtos";

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
 * Controller for handling requests to getAll notification.
 */
export class GetAllNotificationController implements IController {
  constructor(
    private getAllNotificationCase: IGetAllNotificationUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if ((bodyParams.includes("userid"), bodyParams.includes("role"))) {
        const { userId, role } = httpRequest.body as Payload;

        response = await this.getAllNotificationCase.execute({
          recipientId: userId,
        });
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
