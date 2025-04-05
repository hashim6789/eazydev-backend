import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import {
  getAdminRevenueAnalysisComposer,
  getMentorAnalysisComposer,
  getMentorRevenueAnalysisComposer,
} from "../../../infra/services/composers/analyze";
import { getAdminAnalysisComposer } from "../../../infra/services/composers/analyze/get-admin-analysis.composer";

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

analyzeRouter.get(
  "/admin/revenue",
  authenticateToken,
  authorizeRole(["admin"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      getAdminRevenueAnalysisComposer()
    );
    response.status(adapter.statusCode).json(adapter.body);
  }
);

analyzeRouter.get(
  "/mentor/revenue",
  authenticateToken,
  authorizeRole(["mentor"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      getMentorRevenueAnalysisComposer()
    );
    response.status(adapter.statusCode).json(adapter.body);
  }
);

analyzeRouter.get(
  "/admin",
  authenticateToken,
  authorizeRole(["admin"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAdminAnalysisComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
