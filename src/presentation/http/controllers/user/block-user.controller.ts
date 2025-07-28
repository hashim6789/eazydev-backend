import { IBlockUserUseCase } from "../../../../app/usecases/user/interfaces/block-user.usecase";
import {
  BlockUserBodySchema,
  BlockUserPathSchema,
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
 * Controller for handling requests to getAll a user.
 */
export class BlockUserController implements IController {
  constructor(
    private blockUserCase: IBlockUserUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const bodyValidation = BlockUserBodySchema.safeParse(
      httpRequest.body ?? {}
    );
    const pathValidation = BlockUserPathSchema.safeParse(
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
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { change } = bodyValidation.data;
    const { userId } = pathValidation.data;

    const response = await this.blockUserCase.execute({ userId, change });

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
