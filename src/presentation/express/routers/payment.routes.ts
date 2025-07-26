import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import { createPaymentIntendComposer } from "../../../infra/services/composers/payment";

/**
 * Router for handling notification-related routes.
 */
export const paymentRouter = Router();

paymentRouter.post(
  "/create-payment-intent",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      createPaymentIntendComposer()
    );
    response.status(adapter.statusCode).json(adapter.body);
  }
);
