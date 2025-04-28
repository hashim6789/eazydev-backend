import { Router, Request, Response } from "express";
import { authenticateToken, authorizeRole } from "../middlewares";
import { expressAdapter } from "../../adapters/express.adapter";
import {
  getAllCertificateComposer,
  getCertificateComposer,
} from "../../../infra/services/composers/certificate";

// import { createCertificateComposer } from "../../../infra/services/composers/certificate/get-certificate.composer";

/**
 * Router for handling certificate-related routes.
 */
export const certificateRouter = Router();

/**
 * Endpoint to create certificate.
 */
certificateRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllCertificateComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
