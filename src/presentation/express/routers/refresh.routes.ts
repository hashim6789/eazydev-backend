import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { recoverUserInformationUserComposer } from "../../../infra/services/composers/refresh/recover-user.composer";
import { refreshTokenUserComposer } from "../../../infra/services/composers/refresh/refresh-token.composer";
import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";

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

refreshRouter.get("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, refreshTokenUserComposer());

  response.status(adapter.statusCode).json(adapter.body);
});

export { refreshRouter };
