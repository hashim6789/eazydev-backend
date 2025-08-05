import { IGetAllSlotUseCase } from "../../../../app/usecases/slot";
import {
  GetAllSlotByMentorBodySchema,
  GetAllSlotByMentorPathSchema,
  Payload,
  ResponseDTO,
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
export class GetSlotsLearnerController implements IController {
  constructor(
    private _getAllSlotUseCase: IGetAllSlotUseCase,
    private _httpErrors: IHttpErrors,
    private _httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = GetAllSlotByMentorBodySchema.safeParse(
      httpRequest.body ?? {}
    );
    const pathValidation = GetAllSlotByMentorPathSchema.safeParse(
      httpRequest.path ?? {}
    );

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

    const { userId, role } = bodyValidation.data;
    const { mentorId } = pathValidation.data;

    const response = await this._getAllSlotUseCase.execute({
      userId: mentorId, // still mapped intentionally as per original logic
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
