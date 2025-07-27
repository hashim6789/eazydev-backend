import { IBookSlotUseCase } from "../../../../app/usecases/slot";
import {
  IBookSlotRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import {
  HttpErrors,
  HttpResponse,
  HttpSuccess,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import { IController } from "../IController";

/**
 * Controller for handling requests to getAll category.
 */
export class BookSlotController implements IController {
  constructor(
    private bookSlotUseCase: IBookSlotUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0 &&
      httpRequest.path &&
      Object.keys(httpRequest.path).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body);
      const pathParams = Object.keys(httpRequest.path);

      if (
        bodyParams.includes("userId") &&
        bodyParams.includes("role") &&
        pathParams.includes("slotId")
      ) {
        const { userId, role, progressId, learnerId } =
          httpRequest.body as Payload & Omit<IBookSlotRequestDTO, "slotId">;
        const { slotId } = httpRequest.path as Pick<
          IBookSlotRequestDTO,
          "slotId"
        >;

        response = await this.bookSlotUseCase.execute(
          { progressId, slotId, learnerId },
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
