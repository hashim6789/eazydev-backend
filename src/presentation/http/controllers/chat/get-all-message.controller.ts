import { IGetAllChatMessageUseCase } from "../../../../app/usecases/chat/interfaces";
import { IGetAllChatMessagesRequestDTO } from "../../../../domain/dtos/chat-group";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
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
 * Controller for handling requests to create a user.
 */
export class GetAllChatMessageController implements IController {
  constructor(
    private getAllChatMessageUseCase: IGetAllChatMessageUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
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
        pathParams.includes("groupId")
      ) {
        const { userId, role } = httpRequest.body as Payload;
        const { groupId } = httpRequest.path as IGetAllChatMessagesRequestDTO;
        response = await this.getAllChatMessageUseCase.execute(
          { groupId },
          {
            userId,
            role,
          }
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
