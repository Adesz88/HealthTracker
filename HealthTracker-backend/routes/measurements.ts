import {NextFunction, Request, Response} from "express";
import { Measurement } from "../shared/model/measurement";

module.exports = function () {
  const express = require("express");
  const router = express.Router();

  router.post("/new", (req: Request, res: Response) => {
    const measurement = new Measurement({
      type: "weight",
      date: new Date(),
      values: [80]
    });

    measurement.save().then(data => {
      res.status(200).send(data);
    }).catch(error => {
      res.status(500).send(error);
    });
  });

  return router;
}
