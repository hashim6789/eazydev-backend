import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";
import {
  createCategoryComposer,
  getAllCategoryAdminComposer,
  getAllCategoryComposer,
  updateCategoryComposer,
  updateListCategoryComposer,
} from "../../../infra/services/composers/category";

/**
 * Router for handling category-related routes.
 */
export const categoryRouter = Router();

/**
 * Endpoint to create category.
 */
categoryRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createCategoryComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
