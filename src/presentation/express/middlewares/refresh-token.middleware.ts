import { NextFunction, Request, Response } from "express";
import { AuthMessages } from "../../../domain/enums/auth";
import { TokenManagerProvider } from "../../../infra/providers/implementations/token-manager.provider";
import { env } from "../configs/env.config";

export const refreshTokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const refreshToken = request.cookies[env.KEY_OF_REFRESH as string];

  if (!refreshToken) {
    response.status(403).json({
      message: AuthMessages.RefreshTokenMissing,
    });
    return;
  }

  const tokenManager = new TokenManagerProvider();
  const decode = tokenManager.validateToken(refreshToken);
  if (!decode) {
    response.status(403).json({
      message: AuthMessages.RefreshTokenInvalidOrExpired,
    });
    return;
  }

  request.body = { ...request.body, ...decode };

  next();
};
