import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { config } from "../../http/configs/env.config";

import { loginComposer } from "../../../infra/services/composers/auth/login-suth.composer";
import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";
import { getAllMaterialComposer } from "../../../infra/services/composers/material/get-all-materials";

/**
 * Router for handling auth-related routes.
 */
const materialRouter = Router();

/**
 * Endpoint to get all materials.
 */
materialRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllMaterialComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to create material.
 */
materialRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllMaterialComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

export { materialRouter };
