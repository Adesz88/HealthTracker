import { Request, Response } from "express";
import { Measurement } from "../shared/model/measurement";
import { MeasurementType } from "../shared/model/measurement-type";

const isAuthenticated = require("../shared/middlewares/is-authenticated.ts")

module.exports = function () {
  const express = require("express");
  const router = express.Router();

  router.post("/new", isAuthenticated, (req: Request, res: Response) => {
    const measurement = new Measurement({
      type: req.body.type,
      date: req.body.date,
      values: req.body.values,
      comment: req.body.comment,
      user: req.user
    });

    measurement.save().then(data => {
      res.status(200).send(data);
    }).catch(error => {
      res.status(500).send(error);
    });
  });

  router.get("/types", isAuthenticated, (req: Request, res: Response) => {
    const query = MeasurementType.find();
    query.then(types => {
      return res.status(200).send(types);
    }).catch(error => {
      return res.status(404).send("Cannot find measurement types");
    });
  });

  router.get("/", (req: Request, res: Response) => {
    const query = Measurement.findById("663f4132995bbc14aad1ce72").populate("type");
    query.then(measurement => {
      return res.status(200).send(measurement);
    }).catch(error => {
      return res.status(404).send("Cannot find user");
    });
  });

  return router;
}
