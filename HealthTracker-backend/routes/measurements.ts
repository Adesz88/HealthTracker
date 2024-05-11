import { Request, Response } from "express";
import { Measurement } from "../shared/model/measurement";
import { MeasurementType } from "../shared/model/measurement-type";
import { User } from "../shared/model/user";

const isAuthenticated = require("../shared/middlewares/is-authenticated.ts");
const isDoctor = require("../shared/middlewares/is-doctor.ts");

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

  router.get("/tracked", isAuthenticated, isDoctor, (req: Request, res: Response) => {
    if (req.query.date) {
      const start = new Date(req.query.date.toString());
      start.setHours(0, 0, 0, 0);
      const end = new Date(req.query.date.toString());
      end.setHours(23, 59, 59, 999);

      const userQuery = User.find({ doctorId: req.user });
      userQuery.then(users => {
        const measurementQuery = Measurement.find({ user: users, date: { $gte: start, $lte:end } })
          .sort({ date: -1 })
          .populate("type user");
        measurementQuery.then(measurement => {
          return res.status(200).send(measurement);
        }).catch(error => {
          return res.status(404).send("Cannot find measurements");
        });
      }).catch(error => {
        return res.status(404).send("Cannot users");
      });
    } else {
      return res.status(400).send("Invalid date format");
    }
  });

  router.get("/", isAuthenticated, (req: Request, res: Response) => {
    if (req.query.date) {
      const start = new Date(req.query.date.toString());
      start.setHours(0, 0, 0, 0);
      const end = new Date(req.query.date.toString());
      end.setHours(23, 59, 59, 999);

      const query = Measurement.find({ user: req.user, date: { $gte: start, $lte:end } })
        .sort({ date: -1 })
        .populate("type");
      query.then(measurement => {
        return res.status(200).send(measurement);
      }).catch(error => {
        return res.status(500).send();
      });
    } else {
      return res.status(400).send("Invalid date format");
    }
  });

  router.delete("/:id", isAuthenticated, (req: Request, res: Response) => {
    const query = Measurement.findOneAndDelete({ user: req.user, _id: req.params.id });
    query.then(_ => {
      return res.status(202).send();
    }).catch(error => {
      return res.status(500).send();
    });
  });

  return router;
}
