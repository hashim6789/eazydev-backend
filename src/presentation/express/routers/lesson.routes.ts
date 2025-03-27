import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authorizeRole, authenticateToken } from "../middlewares";
import {
  createLessonComposer,
  getLessonComposer,
} from "../../../infra/services/composers/lesson";

/**
 * Router for handling lesson-related routes.
 */
export const lessonRouter = Router();

/**
 * Endpoint to post lesson.
 */
lessonRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createLessonComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

lessonRouter.get(
  "/:lessonId",
  authenticateToken,
  authorizeRole(["mentor", "admin"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getLessonComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

lessonRouter.put(
  "/:lessonId",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getLessonComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
