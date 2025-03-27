import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken } from "../middlewares/authenticate-user.middleware";
import { authorizeRole } from "../middlewares";
// import { createCertificateComposer } from "../../../infra/services/composers/certificate/get-certificate.composer";

/**
 * Router for handling certificate-related routes.
 */
export const certificateRouter = Router();

/**
 * Endpoint to create certificate.
 */
// certificateRouter.post(
//   "/",
//   authenticateToken,
//   authorizeRole(["learner"]),
//   async (request: Request, response: Response) => {
//     const adapter = await expressAdapter(request, createCertificateComposer());
//     response.status(adapter.statusCode).json(adapter.body);
//   }
// );
