import { Request, Response, NextFunction } from "express";
import { Role } from "../../../domain/types/user";

export const authorizeRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.body?.role ?? "learner";
    if (!userRole) {
      res.status(403).json({ success: false, message: "User role is missing" });
    }

    if (allowedRoles.includes(userRole)) {
      return next();
    }

    res.status(403).json({
      success: false,
      message: "You do not have permission to access this resource",
    });
  };
};
