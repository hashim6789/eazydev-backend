import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import {
  getAllCourseComposer,
  getAllCourseNoAuthComposer,
  getCourseComposer,
} from "../../../infra/services/composers/course";

/**
 * Router for handling notification-related routes.
 */
export const noAuthRouter = Router();

noAuthRouter.get(
  "/courses/:courseId",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getCourseComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
noAuthRouter.get("/courses", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAllCourseNoAuthComposer());
  response.status(adapter.statusCode).json(adapter.body);
});
