import { Request, Response, Router } from "express";

// import { ensureAuthenticated } from "../middlewares/authenticate-auth.middleware";
import { signupComposer } from "../../../infra/services/composers/auth/signup-auth.composer";
import { expressAdapter } from "../../adapters/express.adapter";
import { loginComposer } from "../../../infra/services/composers/auth/login-suth.composer";
import { logoutComposer } from "../../../infra/services/composers/auth/logout-auth-composer";
import { googleLoginComposer } from "../../../infra/services/composers/auth/google-auth-composer";
import { config } from "../../http/configs/env.config";

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
    response.cookie(config.KEY_OF_ACCESS as string, adapter.body.token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    response.cookie(
      config.KEY_OF_REFRESH as string,
      adapter.body.refreshToken,
      { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 }
    );
  }
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to login the users.
 */
authRouter.post("/login", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  if (adapter.statusCode === 200) {
    response.cookie(config.KEY_OF_ACCESS as string, adapter.body.token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    response.cookie(
      config.KEY_OF_REFRESH as string,
      adapter.body.refreshToken,
      { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 }
    );
  }
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to logout users.
 */
authRouter.post("/logout", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, logoutComposer());
  if (adapter.statusCode === 200) {
    response.clearCookie(config.KEY_OF_ACCESS as string);
    response.clearCookie(config.KEY_OF_REFRESH as string);
  }
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to login using google for mentor and learner.
 */
authRouter.post("/google", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, googleLoginComposer());
  if (adapter.statusCode === 200) {
    response.cookie(config.KEY_OF_ACCESS as string, adapter.body.token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    response.cookie(
      config.KEY_OF_REFRESH as string,
      adapter.body.refreshToken,
      { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 }
    );
  }
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to verify the otp.
 */
authRouter.post("/otp-verify", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to resend the otp.
 */
authRouter.post("/otp-resend", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to send the forgot password request.
 */
authRouter.post(
  "/forgot-password",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, loginComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
/**
 * Endpoint to get the reset password page.
 */
authRouter.get(
  "/:token/reset-password",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, loginComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
/**
 * Endpoint to reset password.
 */
authRouter.patch(
  "/reset-password",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, loginComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

export { authRouter };
