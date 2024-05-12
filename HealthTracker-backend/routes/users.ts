import {NextFunction, Request, Response} from "express";
import {PassportStatic} from "passport";

import { User } from "../shared/model/user";
import { ROLES } from "../constants";
import { Notification } from "../shared/model/notification";

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
        birthDate: req.body.birthDate,
        doctorId: null
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

  router.get("/current", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(200).send(null);
    }
    const query = User.findById(req.user).select({ password: false,  __v: false});
    query.then(user => {
      return res.status(200).send(user);
    }).catch(error => {
      return res.status(404).send("Cannot find user");
    });
  });

  router.put("/current", isAuthenticated, (req: Request, res: Response) => {
    if (req.body) {
      const query = User.findByIdAndUpdate(req.user, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthPlace: req.body.birthPlace,
        birthDate: req.body.birthDate,
        phone: req.body.phone,
        doctorId: req.body.doctorId
      }, {returnDocument: "before"});
      query.then(user => {
        if (user?.doctorId !== req.body.doctorId) {
          const notification = new Notification({
            message: `${req.body.firstName} ${req.body.lastName} chose you as her/his doctor.`,
            date: new Date(),
            user: req.body.doctorId
          });
          notification.save().then();
        }
        return res.status(200).send();
      }).catch(error => {
        return res.status(400).send("Error during update");
      });
    }
  });

  router.get("/doctors", isAuthenticated, (req: Request, res: Response) => {
    const query = User.find({ role: ROLES.DOCTOR }).select("firstName lastName _id");
    query.then(doctors => {
      return res.status(200).send(doctors);
    }).catch(error => {
      return res.status(404).send("Cannot find doctors");
    });
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
