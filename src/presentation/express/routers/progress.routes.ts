import { Request, Response, Router } from "express";
import { expressAdapter } from "../../adapters/express.adapter";
import { authenticateToken, authorizeRole } from "../middlewares";
import {
  getAllProgressComposer,
  getLearningContentsComposer,
  getSingedUrlComposer,
} from "../../../infra/services/composers/progress";
import { updateProgressComposer } from "../../../infra/services/composers/progress/update-progress.composer";
import { getCertificateComposer } from "../../../infra/services/composers/certificate";

/**
 * Router for handling progress-related routes.
 */
export const progressRouter = Router();

progressRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAllProgressComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

progressRouter.get(
  "/:progressId",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      getLearningContentsComposer()
    );
    response.status(adapter.statusCode).json(adapter.body);
  }
);

progressRouter.post(
  "/:progressId/get-signed-url",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getSingedUrlComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);

progressRouter.put(
  "/:progressId",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateProgressComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
progressRouter.get(
  "/:progressId/certificate",
  authenticateToken,
  authorizeRole(["learner"]),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getCertificateComposer());
    response.status(adapter.statusCode).json(adapter.body);
  }
);
