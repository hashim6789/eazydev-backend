import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import { getMentorAnalysisComposer } from "../../../infra/services/composers/analyze";

/**
 * Router for handling analysis-related routes.
 */
export const analyzeRouter = Router();

analyzeRouter.get(
  "/mentors",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getMentorAnalysisComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

// analyzeRouter.post(
//   "/:meetingId/join",
//   authenticateToken,
//   authorizeRole(["mentor", "learner"]),
//   async (request: Request, response: Response) => {
//     const adapter = await expressAdapter(request, joinMeetingComposer());
//     response.status(adapter.statusCode).json(adapter.body);
//   }
// );
