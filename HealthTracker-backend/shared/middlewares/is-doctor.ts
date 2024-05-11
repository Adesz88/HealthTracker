import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";
import { ROLES } from "../../constants";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const query = User.findOne({ _id: req.user, role: ROLES.DOCTOR });
  query.then(user => {
    return next();
  }).catch(error => {
    return res.status(403).send("Cannot get other users measurements");
  });
}
