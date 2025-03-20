import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import {
  bookSlotComposer,
  createSlotComposer,
  getAllSlotsComposer,
  getSlotsForLearnerComposer,
} from "../../../infra/services/composers/slot";

/**
 * Router for handling notification-related routes.
 */
export const slotRouter = Router();

slotRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createSlotComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

slotRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor", "learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllSlotsComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

slotRouter.get(
  "/mentor/:mentorId",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getSlotsForLearnerComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

slotRouter.patch(
  "/:slotId/book",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, bookSlotComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
