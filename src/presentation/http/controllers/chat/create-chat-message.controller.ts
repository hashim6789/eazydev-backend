import { IGetAllChatGroupUseCase } from "../../../../app/usecases/chat/interfaces";
import { ICreateChatMessageUseCase } from "../../../../app/usecases/chat/interfaces/post-chat-message.usecase";
import { ICreateChatMessageRequestDTO } from "../../../../domain/dtos";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
} from "../../helpers/implementations";
import { IController } from "../IController";

/**
 * Controller for handling requests to create chat message.
 */
export class CreateChatMessageController implements IController {
  constructor(
    private createChatMessageUseCase: ICreateChatMessageUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (
        bodyParams.includes("userId") &&
        bodyParams.includes("role") &&
        bodyParams.includes("message") &&
        bodyParams.includes("groupId")
      ) {
        const { userId, role, message, groupId } = httpRequest.body as Payload &
          ICreateChatMessageRequestDTO;
        response = await this.createChatMessageUseCase.execute(
          { message, groupId },
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
