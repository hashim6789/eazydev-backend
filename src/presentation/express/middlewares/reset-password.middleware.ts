import { NextFunction, Request, Response } from "express";
import { AuthMessages } from "../../../domain/enums/auth";
import { env } from "../configs/env.config";

export const validateResetToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Extract the token from cookies
  const resetToken = request.cookies[env.KEY_OF_RESET as string];

  // If token is missing, respond with 401 Unauthorized
  if (!resetToken) {
    response.status(401).json({
      error: AuthMessages.AuthorizationHeaderMissing,
    });
  }

  // Attach the reset token to the request body
  request.body.tokenId = resetToken;

  // Proceed to the next middleware or route handler
  next();
};
