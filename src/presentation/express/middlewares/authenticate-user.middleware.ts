import { NextFunction, Request, Response } from "express";
import { AuthMessages } from "../../../domain/enums/Authenticate/error-type.enum";
import { TokenManagerProvider } from "../../../infra/providers/token-manager.provider";
import { config } from "../../http/configs/env.config";

export const authenticateToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.cookies);
  const accessToken = request.cookies[config.KEY_OF_ACCESS as string];

  if (!accessToken) {
    response.status(401).json({
      message: AuthMessages.AuthorizationHeaderMissing,
    });
    return;
  }

  const tokenManager = new TokenManagerProvider();
  const decode = tokenManager.validateToken(accessToken);
  if (!decode) {
    response.status(401).json({
      message: AuthMessages.TokenInvalidOrExpired,
    });
    return;
  }

  // Attach user to request object
  request.body = { ...request.body, ...decode };

  next();
};
