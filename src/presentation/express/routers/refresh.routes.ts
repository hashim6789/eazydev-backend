import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { recoverUserInformationUserComposer } from "../../../infra/services/composers/refresh/recover-user.composer";
import { refreshTokenUserComposer } from "../../../infra/services/composers/refresh/refresh-token.composer";
import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole, refreshTokenValidation } from "../middlewares";
import { env } from "process";

/**
 * Router for handling auth-related routes.
 */
const refreshRouter = Router();

/**
 * Endpoint to signup for mentor and learner.
 */
refreshRouter.get(
  "/user",
  authenticateToken,
  authorizeRole(["admin", "learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      recoverUserInformationUserComposer()
    );

    response.status(adapter.statusCode).json(adapter.body);
  }
);

refreshRouter.post(
  "/",
  refreshTokenValidation,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, refreshTokenUserComposer());
    if (adapter.statusCode === 200) {
      response.cookie(env.KEY_OF_ACCESS as string, adapter.body.token, {
        httpOnly: false,
        maxAge: 1 * 60 * 1000,
      });
      response.cookie(
        env.KEY_OF_REFRESH as string,
        adapter.body.refreshTokenId,
        {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000,
        }
      );
    }
    response
      .status(adapter.statusCode)
      .json(adapter.statusCode === 400 ? adapter.body : { success: true });
  }
);

export { refreshRouter };
