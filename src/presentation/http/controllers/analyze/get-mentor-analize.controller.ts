import { IGetMentorAnalyzeUseCase } from "../../../../app/usecases/analyze";
import { Payload, PayloadSchema, ResponseDTO } from "../../../../domain/dtos";
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
export class GetMentorAnalyzeController implements IController {
  constructor(
    private _getMentorAnalyzeUseCase: IGetMentorAnalyzeUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const validation = PayloadSchema.safeParse(httpRequest.body);

    if (!validation.success) {
      const firstErrorMessage = extractFirstZodMessage(validation.error);
      const error = this._httpErrors.error_422(firstErrorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = validation.data;
    const response = await this._getMentorAnalyzeUseCase.execute({
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
