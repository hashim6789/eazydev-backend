import { IGetPersonalInfoUseCase } from "../../../../app/usecases/user";
import { GetPersonalInfoSchema } from "../../../../domain/dtos";
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
 * Controller for handling requests to getAll a user.
 */
export class GetPersonalInfoController implements IController {
  constructor(
    private getPersonalInfoUseCase: IGetPersonalInfoUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = GetPersonalInfoSchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const errorMessage =
        extractFirstZodMessage(bodyValidation.error) || "Invalid input";
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = bodyValidation.data;

    const response = await this.getPersonalInfoUseCase.execute({
      userId,
      role,
    });

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
