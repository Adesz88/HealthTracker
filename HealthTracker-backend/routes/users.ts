import { Request, Response } from 'express';
import {PassportStatic} from "passport";
import {User} from "../shared/model/user";

module.exports = function (passport: PassportStatic) {
  const express = require("express");
  const router = express.Router();

  router.post("/login", passport.authenticate('local'), (req: Request, res: Response) => {
    return res.json({success: true, error: null, data: req.user});
  });

  router.post("/register", (req: Request, res: Response) => {
    console.log(req.body);
    const user = new User({
      email: req.body.email,
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      birthPlace: req.body.birthPlace,
      // BirthDate: new Date(req.body.birthDate)
    });
    console.log(user);
    user.save().then(data => {
      res.status(200).send(data);
    }).catch(error => {
      res.status(500).send(error);
    });
  });

  return router;
};
