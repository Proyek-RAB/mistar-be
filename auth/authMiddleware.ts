import { Request, Response, NextFunction } from "express";
import myPassport from "./passport";
import jwt, { JwtPayload, Secret} from "jsonwebtoken";

const secretKey: Secret = process.env.JWT_SECRET || "";

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

  //adding id 

  // Use Passport's authentication middleware for other endpoints
  myPassport.authenticate("jwt", { session: false })(req, res, next);
};

export const setUserId = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }

  const token = authHeader.slice(7); // Remove "Bearer " from the token
  const decodedToken = jwt.verify(token, secretKey) as JwtPayload;    
  const userId = decodedToken['id'];
  
  req.user = userId;
}