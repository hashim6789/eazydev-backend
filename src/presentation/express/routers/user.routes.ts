import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import {
  getAllUsersComposer,
  getUserComposer,
  updatePersonalInfoComposer,
} from "../../../infra/services/composers/user";
import { blockUserComposer } from "../../../infra/services/composers/user/block-user.composer";
import { authenticateToken, authorizeRole } from "../middlewares";
import { getPersonalInfoComposer } from "../../../infra/services/composers/user/get-personal-info.composer";

/**
 * Router for handling auth-related routes.
 */
const userRouter = Router();

/**
 * Endpoint to signup for mentor and learner.
 */
userRouter.get("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAllUsersComposer());

  response.status(adapter.statusCode).json(adapter.body);
});

/**
 * Endpoint to get personal data of mentor and learner.
 */
userRouter.get(
  "/personal",
  authenticateToken,
  authorizeRole(["learner", "mentor", "admin"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getPersonalInfoComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to update personal data of mentor and learner.
 */
userRouter.put(
  "/personal",
  authenticateToken,
  authorizeRole(["learner", "mentor", "admin"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updatePersonalInfoComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

userRouter.get("/:userId", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getUserComposer());

  response.status(adapter.statusCode).json(adapter.body);
});

userRouter.patch(
  "/:userId/block",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, blockUserComposer());

    response.status(adapter.statusCode).json(adapter.body);
  }
);

export { userRouter };
