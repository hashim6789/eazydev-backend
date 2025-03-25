import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";
import { getAllMaterialComposer } from "../../../infra/services/composers/material/get-all-materials";
import { createMaterialComposer } from "../../../infra/services/composers/material/create-material.composer";
import { getMaterialComposer } from "../../../infra/services/composers/material";

/**
 * Router for handling auth-related routes.
 */
const materialRouter = Router();

/**
 * Endpoint to get all materials.
 */
materialRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllMaterialComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to create material.
 */
materialRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createMaterialComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

/**
 * Endpoint to get material details.
 */
materialRouter.get(
  "/:materialId",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getMaterialComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

// /**
//  * Endpoint to edit material details.
//  */
// materialRouter.put(
//   "/materialId",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   async (request: Request, response: Response) => {
//     const adapter = await expressAdapter(request, getMaterialComposer());
//     response.status(adapter.statusCode).json(adapter.body);
//   }
// );

export { materialRouter };
