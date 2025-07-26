import { NextFunction, Request, Response } from "express";
import { AuthMessages } from "../../../domain/enums/auth";
import { TokenManagerProvider } from "../../../infra/providers/implementations/token-manager.provider";
import { env } from "../configs/env.config";
import { CheckUserBlockedUseCase } from "../../../app/usecases/auth/implementations";
import { UserRepository } from "../../../infra/repositories";
import { UserModel } from "../../../infra/databases/models";

export const refreshTokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.cookies);
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

  // Attach user to request object
  request.body = { ...request.body, ...decode };

  next();
};
