import { IJoinMeetingUseCase } from "../../../../app/usecases/meeting/interfaces";
import {
  IJoinMeetingRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
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
 * Controller for handling requests to getAll category.
 */
export class JoinMeetingController implements IController {
  constructor(
    private joinMeetingUseCase: IJoinMeetingUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0 &&
      httpRequest.path &&
      Object.keys(httpRequest.path).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body);
      const pathParams = Object.keys(httpRequest.path);

      if (
        bodyParams.includes("userId") &&
        bodyParams.includes("role") &&
        bodyParams.includes("peerId") &&
        pathParams.includes("meetingId")
      ) {
        const { userId, role, peerId } = httpRequest.body as Payload &
          Pick<IJoinMeetingRequestDTO, "peerId">;
        const { meetingId } = httpRequest.path as Pick<
          IJoinMeetingRequestDTO,
          "meetingId"
        >;

        response = await this.joinMeetingUseCase.execute(
          { peerId, meetingId },
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
