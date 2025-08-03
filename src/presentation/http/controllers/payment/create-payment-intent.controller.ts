import { ICreatePaymentIntentUseCase } from "../../../../app/usecases/payment/interfaces";
import {
  CreatePaymentIntentSchema,
  PayloadSchema,
} from "../../../../domain/dtos";
import { IController } from "../IController";

import {
  HttpResponse,
  IHttpErrors,
  IHttpRequest,
  IHttpResponse,
  IHttpSuccess,
} from "../../helpers";
import { extractFirstZodMessage } from "../../utils";

/**
 * Controller for handling requests to getAll category.
 */
export class CreatePaymentIntentController implements IController {
  constructor(
    private createPaymentIntentUseCase: ICreatePaymentIntentUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const validationResult = CreatePaymentIntentSchema.safeParse(
      httpRequest.body ?? {}
    );

    const userValidation = PayloadSchema.safeParse(httpRequest.body ?? {});

    if (!validationResult.success || !userValidation.success) {
      const queryError = !validationResult.success
        ? extractFirstZodMessage(validationResult.error)
        : null;
      const userError = !userValidation.success
        ? extractFirstZodMessage(userValidation.error)
        : null;
      const errorMessage = queryError || userError || "Invalid request";
      const error = this.httpErrors.error_422(errorMessage);
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId, role } = userValidation.data;
    const { courseId } = validationResult.data;

    const response = await this.createPaymentIntentUseCase.execute(courseId, {
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
