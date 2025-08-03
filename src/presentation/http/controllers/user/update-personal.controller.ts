import { IUpdatePersonalInfoUseCase } from "../../../../app/usecases/user";
import { UpdatePersonalInfoBodySchema } from "../../../../domain/dtos";
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
export class UpdatePersonalInfoController implements IController {
  constructor(
    private updatePersonalInfoUseCase: IUpdatePersonalInfoUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = UpdatePersonalInfoBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!bodyValidation.success) {
      const errorMessage =
        extractFirstZodMessage(bodyValidation.error) || "Invalid input";
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role, firstName, lastName } = bodyValidation.data;

    const response = await this.updatePersonalInfoUseCase.execute(
      { firstName, lastName },
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
