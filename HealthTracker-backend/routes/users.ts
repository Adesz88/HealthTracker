import {NextFunction, Request, Response} from 'express';
import {PassportStatic, use} from "passport";

import { User } from "../shared/model/user";

const isAuthenticated = require("../shared/middlewares/is-authenticated.ts")

module.exports = function (passport: PassportStatic) {
  const express = require("express");
  const router = express.Router();

  router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (error: string | null, user: typeof User) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        if (!user) {
          res.status(400).send('User not found.');
        } else {
          req.login(user, (err: string | null) => {
            if (err) {
              console.log(err);
              res.status(500).send('Internal server error.');
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
      return res.json({success: true, error: null, data: null});
    });
  });

  router.post("/register", async (req: Request, res: Response) => {
    console.log(req.body);

    if (!await User.findOne({ email: req.body.email })) {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
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
      return res.status(404).json({success: false, error: "This email is already in use.", data: null});
    }
  });

  router.get('/list', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const query = User.find();
    query.then(users => {
      return res.status(200).json({success: true, error: null, data: users});
    }).catch(error => {
      return res.status(404).json({success: false, error: "Cannot find users", data: null});
    });
  });

  return router;
};
