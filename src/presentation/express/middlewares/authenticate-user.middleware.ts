import { NextFunction, Request, RequestHandler, Response } from "express";

import { AuthMessages } from "../../../domain/enums/Authenticate/error-type.enum";
import { TokenManagerProvider } from "../../../infra/providers/token-manager.provider";

export const ensureAuthenticated: RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization;
  request.body.userId = "Hashim";

  if (!authToken) {
    response.status(401).json({
      message: AuthMessages.AuthorizationHeaderMissing,
    });
    return;
  }

  const [, token] = authToken.split(" ");

  const tokenManager = new TokenManagerProvider();
  if (!tokenManager.validateToken(token)) {
    response.status(401).json({
      message: AuthMessages.TokenInvalidOrExpired,
    });
    return;
  }

  next();
};
