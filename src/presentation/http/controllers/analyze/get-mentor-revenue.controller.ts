import { IGetMentorRevenueAnalyzeUseCase } from "../../../../app/usecases/analyze";
import { PayloadSchema } from "../../../../domain/dtos";
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
 * Controller for handling requests to create a Category.
 */
export class GetMentorRevenueAnalysisController implements IController {
  constructor(
    private _getMentorRevenueAnalyzeUseCase: IGetMentorRevenueAnalyzeUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const validation = PayloadSchema.safeParse(httpRequest.body);

    if (!validation.success) {
      const firstError = extractFirstZodMessage(validation.error);
      const error = this._httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId } = validation.data;
    const response = await this._getMentorRevenueAnalyzeUseCase.execute(userId);

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
