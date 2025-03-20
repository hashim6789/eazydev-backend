import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";

import { authenticateToken, authorizeRole } from "../middlewares";
import { createPaymentIntendComposer } from "../../../infra/services/composers/payment";
import { getAllProgressComposer } from "../../../infra/services/composers/progress/get-all-progress.composer";

/**
 * Router for handling progress-related routes.
 */
export const progressRouter = Router();

progressRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllProgressComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
