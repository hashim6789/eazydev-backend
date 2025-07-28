import { ICreateMaterialUseCase } from "../../../../app/usecases/material";
import { Payload } from "../../../../domain/dtos";
// import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ICreateMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response";
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
 * Controller for handling requests to create a user.
 */
export class CreateMaterialController implements IController {
  constructor(
    private createMaterialUseCase: ICreateMaterialUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (
        bodyParams.includes("title") &&
        bodyParams.includes("description") &&
        // bodyParams.includes("mentorId") &&
        bodyParams.includes("type") &&
        bodyParams.includes("fileKey") &&
        bodyParams.includes("duration") &&
        // bodyParams.includes("lessonId") &&
        bodyParams.includes("userId") &&
        bodyParams.includes("role")
      ) {
        const {
          userId,
          role,
          title,
          description,
          // mentorId,
          type,
          fileKey,
          duration,
          // lessonId,
        } = httpRequest.body as Payload &
          Omit<ICreateMaterialRequestDTO, "mentorId">;
        response = await this.createMaterialUseCase.execute(
          {
            title,
            description,
            mentorId: userId,
            type,
            fileKey,
            duration,
            // lessonId,
          },
          { userId, role }
        );
      } else {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_201(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
