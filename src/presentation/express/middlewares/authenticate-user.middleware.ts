import { NextFunction, Request, Response } from "express";
import { AuthMessages } from "../../../domain/enums/auth";
import { TokenManagerProvider } from "../../../infra/providers/implementations/token-manager.provider";
import { env } from "../configs/env.config";
import { CheckUserBlockedUseCase } from "../../../app/usecases/auth/implementations";
import { UserRepository } from "../../../infra/repositories";
import { UserModel } from "../../../infra/databases/models";

export const authenticateToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const accessToken = request.cookies[env.KEY_OF_ACCESS as string];

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

  const userRepository = new UserRepository(UserModel);
  const checkUserBlockedUseCase = new CheckUserBlockedUseCase(userRepository);
  const checkUserBlockedResponse = await checkUserBlockedUseCase.execute(
    decode
  );

  if (!checkUserBlockedResponse.success) {
    response.status(403).json({ message: checkUserBlockedResponse.data.error });
    return;
  }

  request.body = { ...request.body, ...decode };

  next();
};
