import { IGetAdminAnalyzeUseCase } from "../../../../app/usecases/analyze";
import {
  HttpResponse,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import { IController } from "../IController";

/**
 * Controller for handling requests to getAll category.
 */
export class GetAdminAnalyzeController implements IController {
  constructor(
    private _getAdminAnalysisUseCase: IGetAdminAnalyzeUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;

    const response = await this._getAdminAnalysisUseCase.execute();

    if (!response.success) {
      error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
