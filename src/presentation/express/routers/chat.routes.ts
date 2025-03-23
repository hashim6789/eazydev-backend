import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import {
  createChatMessageComposer,
  getAllChatGroupComposer,
  getAllMessagesComposer,
} from "../../../infra/services/composers/chat";

/**
 * Router for handling chat-related routes.
 */
export const chatRouter = Router();

/**
 * Endpoint to get all chat groups.
 */
chatRouter.get(
  "/groups",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllChatGroupComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to get all chat messages of group.
 */
chatRouter.get(
  "/groups/:groupId/messages",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllMessagesComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to post chat messages of group.
 */
chatRouter.post(
  "/messages",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createChatMessageComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
