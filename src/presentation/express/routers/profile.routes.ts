import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import { createPurchaseComposer } from "../../../infra/services/composers/purchase";

/**
 * Router for handling notification-related routes.
 */
export const profileRouter = Router();

profileRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createPurchaseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
