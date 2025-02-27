import { Request, Response, Router } from "express";

import { createUserComposer } from "../../../infra/services/composers/user/create-user.composer";
// import { deleteUserComposer } from '../../../infra/services/composers/User/deleteUser'
import { getUserComposer } from "../../../infra/services/composers/user/get-user.composer";
// import { updateUserComposer } from '../../../infra/services/composers/User/updateUser'
import { expressAdapter } from "../../adapters/express.adapter";
import { ensureAuthenticated } from "../middlewares/authenticate-user.middleware";

/**
 * Router for handling user-related routes.
 */
const userRoutes = Router();

/**
 * Endpoint to create a new user.
 */
userRoutes.post("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createUserComposer());
  response.status(adapter.statusCode).json(adapter.body);
});

/**
 * Endpoint to get user information (requires authentication).
 */
userRoutes.get(
  "/",
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getUserComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to update user information (requires authentication).
 */
// userRoutes.patch(
//   '/:id',
//   ensureAuthenticated,
//   async (request: Request, response: Response) => {
//     const adapter = await expressAdapter(request, updateUserComposer())
//     return response.status(adapter.statusCode).json(adapter.body)
//   },
// )

/**
 * Endpoint to delete a user (requires authentication).
 */
// userRoutes.delete(
//   '/:id',
//   ensureAuthenticated,
//   async (request: Request, response: Response) => {
//     const adapter = await expressAdapter(request, deleteUserComposer())
//     return response.status(adapter.statusCode).json(adapter.body)
//   },
// )

export { userRoutes };
