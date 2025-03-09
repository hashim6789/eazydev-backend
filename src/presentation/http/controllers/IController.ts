import { IHttpRequest } from "../helpers/IHttpRequest";
import { IHttpResponse } from "../helpers/IHttpResponse";

export interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
