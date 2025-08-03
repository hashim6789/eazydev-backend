import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authorizeRole, authenticateToken } from "../middlewares";
import { getAllCertificateComposer } from "../../../infra/services/composers/certificate";

/**
 * Router for handling certificate-related routes.
 */
export const certificateRouter = Router();

certificateRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor", "admin", "learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllCertificateComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
