import { Request, Response, NextFunction } from "express";
import myPassport from "./passport";

// Middleware function to disable authentication for certain endpoints
export const bypassAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Specify the endpoints that don't require authentication
  const nonAuthEndpoints = ["/api/v1/user/login","/api/v1/user/data"];

  // Check if the current endpoint is in the nonAuthEndpoints array
  if (nonAuthEndpoints.includes(req.path)) {
    return next(); // Skip authentication
  }

  // Use Passport's authentication middleware for other endpoints
  myPassport.authenticate("jwt", { session: false })(req, res, next);
};
