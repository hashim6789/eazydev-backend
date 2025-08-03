import { IGetAllMaterialUseCase } from "../../../../app/usecases/material";
import {
  GetAllMaterialsBodySchema,
  GetAllMaterialsQuerySchema,
} from "../../../../domain/dtos/material";
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
 * Controller for handling requests to create a user.
 */
export class GetAllMaterialController implements IController {
  constructor(
    private getAllMaterialUseCase: IGetAllMaterialUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const queryValidation = GetAllMaterialsQuerySchema.safeParse(
      httpRequest.query ?? {}
    );
    const bodyValidation = GetAllMaterialsBodySchema.safeParse(
      httpRequest.body ?? {}
    );

    if (!queryValidation.success || !bodyValidation.success) {
      const queryError = !queryValidation.success
        ? extractFirstZodMessage(queryValidation.error)
        : null;
      const bodyError = !bodyValidation.success
        ? extractFirstZodMessage(bodyValidation.error)
        : null;
      const errorMessage = queryError || bodyError || "Invalid input";

      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const query = queryValidation.data;
    const { userId, role } = bodyValidation.data;

    const response = await this.getAllMaterialUseCase.execute({
      query,
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
