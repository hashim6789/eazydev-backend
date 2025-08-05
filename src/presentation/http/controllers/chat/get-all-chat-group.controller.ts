import { IGetAllChatGroupUseCase } from "../../../../app/usecases/chat/interfaces";
import { GetAllChatGroupSchema } from "../../../../domain/dtos/chat-group";
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
 * Controller for handling requests to get all groups.
 */
export class GetAllChatGroupController implements IController {
  constructor(
    private _getAllChatGroupUseCase: IGetAllChatGroupUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = GetAllChatGroupSchema.safeParse(httpRequest.body ?? {});

    if (!parsedBody.success) {
      const firstError = extractFirstZodMessage(parsedBody.error);
      const error = this._httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = parsedBody.data;
    const response = await this._getAllChatGroupUseCase.execute({
      userId,
      role,
    });

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
