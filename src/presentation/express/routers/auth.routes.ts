import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { signupComposer } from "../../../infra/services/composers/auth/signup-auth.composer";
import { loginComposer } from "../../../infra/services/composers/auth/login-suth.composer";
import { logoutComposer } from "../../../infra/services/composers/auth/logout-auth-composer";
import { googleLoginComposer } from "../../../infra/services/composers/auth/google-auth-composer";
import {
  forgotPasswordComposer,
  getResetPageComposer,
  otpVerifyComposer,
  resetPasswordComposer,
} from "../../../infra/services/composers/auth";
import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { resendOtpComposer } from "../../../infra/services/composers/auth/otp-resend-auth.composer";
import { authorizeRole, validateResetToken } from "../middlewares";
import { env } from "../configs/env.config";

/**
 * Router for handling auth-related routes.
 */
const authRouter = Router();

/**
 * Endpoint to signup for mentor and learner.
 */
authRouter.post("/signup", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, signupComposer());
  if (adapter.statusCode === 201) {
    response.cookie(env.KEY_OF_ACCESS as string, adapter.body.token, {
      httpOnly: false,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    response.cookie(env.KEY_OF_REFRESH as string, adapter.body.refreshTokenId, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  }
  response.status(adapter.statusCode).json(adapter.body.user);
});
/**
 * Endpoint to login the users.
 */
authRouter.post("/login", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  if (adapter.statusCode === 200) {
    response.cookie(env.KEY_OF_ACCESS as string, adapter.body.token, {
      httpOnly: false,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    response.cookie(env.KEY_OF_REFRESH as string, adapter.body.refreshTokenId, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  }
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to logout users.
 */
authRouter.post("/logout", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, logoutComposer());
  if (adapter.statusCode === 200) {
    response.clearCookie(env.KEY_OF_ACCESS as string);
    response.clearCookie(env.KEY_OF_REFRESH as string);
  }
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to login using google for mentor and learner.
 */
authRouter.post("/google", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, googleLoginComposer());
  if (adapter.statusCode === 200) {
    response.cookie(env.KEY_OF_ACCESS as string, adapter.body.token, {
      httpOnly: false,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    response.cookie(env.KEY_OF_REFRESH as string, adapter.body.refreshTokenId, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  }
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to verify the otp.
 */
authRouter.post("/otp-verify", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, otpVerifyComposer());
  response.status(adapter.statusCode).json(adapter.body.user);
});
/**
 * Endpoint to resend the otp.
 */
authRouter.post(
  "/otp-resend",
  authenticateToken,
  authorizeRole(["mentor", "learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, resendOtpComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
/**
 * Endpoint to send the forgot password request.
 */
authRouter.post(
  "/forgot-password",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, forgotPasswordComposer());
    response
      .status(adapter.statusCode)
      .json({ success: adapter.statusCode === 200 });
  }
);
/**
 * Endpoint to get the reset password page.
 */
authRouter.get(
  "/:tokenId/reset-password",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getResetPageComposer());
    if (adapter.statusCode === 200) {
      response.cookie(env.KEY_OF_RESET as string, adapter.body.tokenId, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
    }
    response
      .status(adapter.statusCode)
      .json({ success: adapter.statusCode === 200 });
  }
);
/**
 * Endpoint to reset password.
 */
authRouter.patch(
  "/reset-password",
  validateResetToken,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, resetPasswordComposer());
    if (adapter.statusCode === 200) {
      response.clearCookie(env.KEY_OF_RESET as string);
    }
    response
      .status(adapter.statusCode)
      .json({ success: adapter.statusCode === 200 });
  }
);

export { authRouter };
