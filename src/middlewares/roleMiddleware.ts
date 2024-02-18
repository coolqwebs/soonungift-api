import type { NextFunction, Request, Response } from "express"
import { Roles } from "../types/types"

const roleMiddleware = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes(req.user.role)) {
      next()
    } else {
      res.status(403).send("huesos")
    }
  }
}

export default roleMiddleware
