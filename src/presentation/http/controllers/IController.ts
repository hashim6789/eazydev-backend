import { IHttpRequest, IHttpResponse } from "../helpers";

export interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
