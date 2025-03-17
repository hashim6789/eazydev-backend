import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";

import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";
import {
  createCourseComposer,
  updateStatusCourseComposer,
} from "../../../infra/services/composers/course";

/**
 * Router for handling course-related routes.
 */
const courseRouter = Router();

/**
 * Endpoint to create course.
 */
courseRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createCourseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to update status course.
 */
courseRouter.patch(
  "/courseId",
  authenticateToken,
  authorizeRole(["admin", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateStatusCourseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to update course.
 */
courseRouter.put(
  "/courseId",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateStatusCourseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
