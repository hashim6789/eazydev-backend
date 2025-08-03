import { ICreateChatMessageUseCase } from "../../../../app/usecases/chat/interfaces/post-chat-message.usecase";
import { CreateChatMessageSchema } from "../../../../domain/dtos/chat-group";
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
 * Controller for handling requests to create chat message.
 */
export class CreateChatMessageController implements IController {
  constructor(
    private createChatMessageUseCase: ICreateChatMessageUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = CreateChatMessageSchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!parsedBody.success) {
      const firstError = extractFirstZodMessage(parsedBody.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role, message, groupId } = parsedBody.data;

    const response = await this.createChatMessageUseCase.execute(
      { message, groupId },
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
