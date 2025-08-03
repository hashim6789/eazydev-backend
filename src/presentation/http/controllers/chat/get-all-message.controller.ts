import { IGetAllChatMessageUseCase } from "../../../../app/usecases/chat/interfaces";
import {
  GetAllChatMessagesBodySchema,
  GetAllChatMessagesPathSchema,
} from "../../../../domain/dtos/chat-group";
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
export class GetAllChatMessageController implements IController {
  constructor(
    private getAllChatMessageUseCase: IGetAllChatMessageUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = GetAllChatMessagesBodySchema.safeParse(
      httpRequest.body ?? {}
    );
    const pathValidation = GetAllChatMessagesPathSchema.safeParse(
      httpRequest.path ?? {}
    );

    if (!bodyValidation.success || !pathValidation.success) {
      const bodyError = !bodyValidation.success
        ? extractFirstZodMessage(bodyValidation.error)
        : null;
      const pathError = !pathValidation.success
        ? extractFirstZodMessage(pathValidation.error)
        : null;
      const errorMessage = bodyError || pathError || "Invalid request data";
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = bodyValidation.data;
    const { groupId } = pathValidation.data;

    const response = await this.getAllChatMessageUseCase.execute(
      { groupId },
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
