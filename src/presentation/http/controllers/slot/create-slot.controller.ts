import { ICreateSlotUseCase } from "../../../../app/usecases/slot";
import { CreateSlotRequestSchema } from "../../../../domain/dtos";
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
export class CreateSlotController implements IController {
  constructor(
    private _createSlotUseCase: ICreateSlotUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = CreateSlotRequestSchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const errorMessage =
        extractFirstZodMessage(bodyValidation.error) || "Invalid input";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role, time, mentorId } = bodyValidation.data;

    const response = await this._createSlotUseCase.execute(
      { mentorId, time },
      { userId, role }
    );

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
