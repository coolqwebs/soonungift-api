import type { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  try {
    const token = (authHeader as string).split(" ")[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error: any, user: any) => {
      if (error) {
        return res.sendStatus(403);
      }

      console.log("Auth middleware user:", user);
      req.user = user;
      next();
    });
  } catch (error) {
    return res.sendStatus(401);
  }
};

export default authMiddleware;
