import { Request, Response, Router } from "express";

// import { ensureAuthenticated } from "../middlewares/authenticate-auth.middleware";
import { signupComposer } from "../../../infra/services/composers/auth/signup-auth.composer";
import { expressAdapter } from "../../adapters/express.adapter";
import { loginComposer } from "../../../infra/services/composers/auth/login-suth.composer";

/**
 * Router for handling auth-related routes.
 */
const authRouter = Router();

/**
 * Endpoint to create a new auth.
 */
authRouter.post("/signup", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, signupComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to create a new auth.
 */
authRouter.post("/login", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to create a new auth.
 */
authRouter.post("/logout", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to create a new auth.
 */
authRouter.post("/google", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to create a new auth.
 */
authRouter.post("/otp-verify", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to create a new auth.
 */
authRouter.post("/otp-resend", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, loginComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
/**
 * Endpoint to create a new auth.
 */
authRouter.post(
  "/forgot-password",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, loginComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
/**
 * Endpoint to create a new auth.
 */
authRouter.get(
  "/:token/reset-password",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, loginComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
/**
 * Endpoint to create a new auth.
 */
authRouter.patch(
  "/reset-password",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, loginComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

export { authRouter };
