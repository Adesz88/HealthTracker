import { Request, Response, NextFunction } from "express";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({success: false, error: "You are not logged in.", data: null});
  }
}
