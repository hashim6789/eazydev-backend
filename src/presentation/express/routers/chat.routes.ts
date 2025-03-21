import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import { getAllChatGroupComposer } from "../../../infra/services/composers/chat";

/**
 * Router for handling progress-related routes.
 */
export const chatRouter = Router();

chatRouter.get(
  "/groups",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllChatGroupComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
