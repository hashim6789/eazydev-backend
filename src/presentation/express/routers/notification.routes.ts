import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authorizeRole, authenticateToken } from "../middlewares";
import {
  createLessonComposer,
  getLessonComposer,
} from "../../../infra/services/composers/lesson";
import { getNotificationComposer } from "../../../infra/services/composers/notification";

/**
 * Router for handling notification-related routes.
 */
export const notificationRouter = Router();

notificationRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor", "admin", "learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getNotificationComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
