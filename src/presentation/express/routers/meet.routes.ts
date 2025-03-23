import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import { getAllMeetsComposer } from "../../../infra/services/composers/meet/get-all-meets.composer";
import { joinMeetingComposer } from "../../../infra/services/composers/meet/join-meetinng.composer";

/**
 * Router for handling notification-related routes.
 */
export const meetingRouter = Router();

meetingRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor", "learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllMeetsComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

meetingRouter.post(
  "/:meetingId/join",
  authenticateToken,
  authorizeRole(["mentor", "learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, joinMeetingComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
