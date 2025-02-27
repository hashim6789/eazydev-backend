import { Request, Response, Router } from "express";

// import { createAuthComposer } from "../../../infra/services/composers/auth/create-auth.composer";
// import { deleteAuthComposer } from '../../../infra/services/composers/Auth/deleteAuth'
// import { getAuthComposer } from "../../../infra/services/composers/auth/get-auth.composer";
// import { updateAuthComposer } from '../../../infra/services/composers/Auth/updateAuth'
// import { ensureAuthenticated } from "../middlewares/authenticate-auth.middleware";
import { signupComposer } from "../../../../infra/services/composers/auth/signup-auth.composer";
import { expressAdapter } from "../../../adapters/express.adapter";

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
  const adapter = await expressAdapter(request, signupComposer());
  response.status(adapter.statusCode).json(adapter.body);
});

export { authRouter };
