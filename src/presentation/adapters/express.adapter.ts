import { IController } from "../http/controllers/IController";
import { IHttpResponse } from "../http/helpers";
import { HttpRequest } from "../http/helpers/implementations/HttpRequest";
import { Request } from "express";

export async function expressAdapter(
  req: Request,
  apiRoute: IController
): Promise<IHttpResponse> {
  const httpRequest = new HttpRequest({
    header: req.header,
    query: req.query,
    body: req.body,
    path: req.params,
  });

  const httpResponse = await apiRoute.handle(httpRequest);
  return httpResponse;
}
