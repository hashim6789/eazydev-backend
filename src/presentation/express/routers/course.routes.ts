import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";

import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";
import { createCourseComposer } from "../../../infra/services/composers/course";

/**
 * Router for handling course-related routes.
 */
const courseRouter = Router();

/**
 * Endpoint to post course.
 */
courseRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createCourseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
