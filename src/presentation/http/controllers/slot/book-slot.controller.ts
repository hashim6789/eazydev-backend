import { IBookSlotUseCase } from "../../../../app/usecases/slot";
import {
  BookSlotBodySchema,
  BookSlotPathSchema,
} from "../../../../domain/dtos";
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
export class BookSlotController implements IController {
  constructor(
    private _bookSlotUseCase: IBookSlotUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = BookSlotBodySchema.safeParse(httpRequest.body ?? {});
    const pathValidation = BookSlotPathSchema.safeParse(httpRequest.path ?? {});

    if (!bodyValidation.success || !pathValidation.success) {
      const bodyMsg = bodyValidation.success
        ? null
        : extractFirstZodMessage(bodyValidation.error);
      const pathMsg = pathValidation.success
        ? null
        : extractFirstZodMessage(pathValidation.error);
      const errorMessage = bodyMsg ?? pathMsg ?? "Invalid input";
      const error = this._httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role, progressId, learnerId } = bodyValidation.data;
    const { slotId } = pathValidation.data;

    const response = await this._bookSlotUseCase.execute(
      { progressId, slotId, learnerId },
      { userId, role }
    );

    if (!response.success) {
      const error = this._httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this._httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
