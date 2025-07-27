import { IGetAllCategoryUseCase } from "../../../../app/usecases/category";
import { Payload, ResponseDTO } from "../../../../domain/dtos";
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
export class GetAllCategoryController implements IController {
  constructor(
    private getAllCategoryCase: IGetAllCategoryUseCase,
    private httpErrors: IHttpErrors,
    private httpSuccess: IHttpSuccess
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    const { role } = (httpRequest.body as Payload) || { role: "learner" };

    response = await this.getAllCategoryCase.execute(role);
    if (!response.success) {
      error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
