import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";

import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";
import { uploadMaterialContentComposer } from "../../../infra/services/composers/upload/material-content-upload.composer";

/**
 * Router for handling auth-related routes.
 */
const uploadRouter = Router();

/**
 * Endpoint to get all uploads.
 */
uploadRouter.post(
  "/signed-url",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      uploadMaterialContentComposer()
    );
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to create upload.
 */
// uploadRouter.get(
//   "/",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   async (request: Request, response: Response) => {
//     const adapter = await expressAdapter(request, getAllUploadComposer());
//     response.status(adapter.statusCode).json(adapter.body);
//   }
// );

export { uploadRouter };
