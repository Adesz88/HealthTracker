import {NextFunction, Request, Response} from "express";
import {PassportStatic, use} from "passport";

import { User } from "../shared/model/user";
import { ROLES } from "../constants";

const isAuthenticated = require("../shared/middlewares/is-authenticated.ts")

module.exports = function (passport: PassportStatic) {
  const express = require("express");
  const router = express.Router();

  router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (error: string | null, user: typeof User) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        if (!user) {
          res.status(400).send("User not found.");
        } else {
          req.login(user, (err: string | null) => {
            if (err) {
              console.log(err);
              res.status(500).send("Internal server error.");
            } else {
              res.status(200).send(user);
            }
          });
        }
      }
    })(req, res, next);
  });

  router.delete("/logout", (req: Request, res: Response) => {
    req.logOut(() => {
      return res.status(204).send();
    });
  });

  router.post("/register", async (req: Request, res: Response) => {
    console.log(req.body);

    if (!await User.findOne({ email: req.body.email })) {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: ROLES.USER,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        birthPlace: req.body.birthPlace,
        BirthDate: req.body.birthDate
      });
      user.save().then(data => {
        res.status(200).send(data);
      }).catch(error => {
        res.status(500).send(error);
      });
    } else {
      return res.status(404).send("This email is already in use.");
    }
  });

  router.get("/list", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const query = User.find();
    query.then(users => {
      return res.status(200).send(users);
    }).catch(error => {
      return res.status(404).send("Cannot find users");
    });
  });

  router.get("/", (req: Request, res: Response) => {
    if (req.user) {
      return res.status(200).send(true);
    }
    return res.status(200).send(false);
  });

  return router;
};