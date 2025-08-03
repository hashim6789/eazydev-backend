import { ICreateCourseUseCase } from "../../../../app/usecases/course";
import { CreateCourseSchema } from "../../../../domain/dtos";
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
 * Controller for handling requests to create a Course.
 */
export class CreateCourseController implements IController {
  constructor(
    private createCourseUseCase: ICreateCourseUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = CreateCourseSchema.safeParse(httpRequest.body ?? {});

    if (!parsedBody.success) {
      const firstError = extractFirstZodMessage(parsedBody.error);
      const error = this.httpErrors.error_422(firstError);
      return new HttpResponse(error.statusCode, error.body);
    }

    const {
      userId,
      role,
      title,
      description,
      mentorId,
      categoryId,
      thumbnail,
      price,
    } = parsedBody.data;

    const response = await this.createCourseUseCase.execute(
      { title, description, mentorId, categoryId, thumbnail, price },
      { userId, role }
    );

    if (!response.success) {
      const error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_201(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
