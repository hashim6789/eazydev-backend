import { NextFunction, Request, Response } from "express";
import { AuthMessages } from "../../../domain/enums/auth";
import { TokenManagerProvider } from "../../../infra/providers/token-manager.provider";
import { env } from "../configs/env.config";

export const refreshTokenValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.cookies);
  const tokenId = request.cookies[env.KEY_OF_REFRESH as string];

  if (!tokenId) {
    response.status(403).json({
      message: AuthMessages.RefreshTokenMissing,
    });
    return;
  }

  // Attach user to request object
  request.body = { ...request.body, tokenId };

  next();
};
