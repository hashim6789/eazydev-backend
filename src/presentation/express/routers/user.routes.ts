import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import {
  ChangePasswordComposer,
  getAllUsersComposer,
  updatePersonalInfoComposer,
  VerifyPasswordComposer,
} from "../../../infra/services/composers/user";
import { blockUserComposer } from "../../../infra/services/composers/user/block-user.composer";
import { authenticateToken, authorizeRole } from "../middlewares";
import { getPersonalInfoComposer } from "../../../infra/services/composers/user/get-personal-info.composer";
import { getUserDataComposer } from "../../../infra/services/composers/user/get-user-data.composer";

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
 * Endpoint to signup for mentor and learner.
 */
// userRouter.get("/:userId", async (request: Request, response: Response) => {
//   const adapter = await expressAdapter(request, getUserComposer());

//   response.status(adapter.statusCode).json(adapter.body);
// });

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

/**
 * Endpoint to verify current password data of mentor and learner.
 */
userRouter.post(
  "/verify-password",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, VerifyPasswordComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to verify current password data of mentor and learner.
 */
userRouter.post(
  "/change-password",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, ChangePasswordComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

userRouter.get("/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getUserDataComposer());

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
