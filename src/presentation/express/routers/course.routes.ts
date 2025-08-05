import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";

import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";
import {
  createCourseComposer,
  getAllCourseComposer,
  getCourseComposer,
  updateCourseComposer,
  updateStatusCourseComposer,
} from "../../../infra/services/composers/course";

/**
 * Router for handling course-related routes.
 */
export const courseRouter = Router();

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
  "/:courseId",
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
  "/:courseId",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateCourseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to get all course.
 */
courseRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor", "admin", "learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllCourseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to get all course.
 */
courseRouter.get(
  "/:courseId",
  // authenticateToken,
  // authorizeRole(["mentor", "admin", "learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getCourseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
