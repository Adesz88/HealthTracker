import { Request, Response } from "express";
import { Measurement } from "../shared/model/measurement";
import { MeasurementType } from "../shared/model/measurement-type";
import { User } from "../shared/model/user";
import { Notification } from "../shared/model/notification";

const isAuthenticated = require("../shared/middlewares/is-authenticated");
const isDoctor = require("../shared/middlewares/is-doctor");

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

    measurement.save().then(data => data.populate("user type")).then(measurement => {
      const user = measurement.user as any;
      const type = measurement.type as any;
      const notification = new Notification({
        message: `${user.firstName} ${user.lastName} uploaded a new ${type.name.toLowerCase()} measurement.`,
        date: req.body.date,
        user: user.doctorId
      });
      notification.save().then();

      console.log(`/measurement/new endpoint called: ${req.user} uploaded a new ${type.name.toLowerCase()} measurement.`);
      return res.status(200).send();
    }).catch(error => {
      console.log(`/measurement/new endpoint called: error while uploading a measurement: ${error}`);
      res.status(500).send();
    });
  });

  router.get("/types", isAuthenticated, (req: Request, res: Response) => {
    const query = MeasurementType.find();
    query.then(types => {
      console.log(`/measurement/types endpoint called`);
      return res.status(200).send(types);
    }).catch(error => {
      console.log(`/measurement/types endpoint called: error while getting types: ${error}`);
      return res.status(500).send();
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
          console.log(`/measurement/tracked endpoint called: ${req.user} listed patient measurements.`);
          return res.status(200).send(measurement);
        }).catch(error => {
          console.log(`/measurement/tracked endpoint called: error while listing patient measurements: ${error}`);
          return res.status(500).send();
        });
      }).catch(error => {
        console.log(`/measurement/tracked endpoint called: error while listing patient measurements: ${error}`);
        return res.status(500).send();
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
        console.log(`/measurements endpoint called: ${req.user} listed user measurements.`);
        return res.status(200).send(measurement);
      }).catch(error => {
        console.log(`/measurements endpoint called: error while listing user measurements: ${error}`);
        return res.status(500).send();
      });
    } else {
      return res.status(400).send("Invalid date format");
    }
  });

  router.delete("/:id", isAuthenticated, (req: Request, res: Response) => {
    const query = Measurement.findOneAndDelete({ user: req.user, _id: req.params.id });
    query.then(_ => {
      console.log(`/measurement/id endpoint called: ${req.user} deleted a measurement.`);
      return res.status(202).send();
    }).catch(error => {
      console.log(`/measurement/id endpoint called: error while deleting measurements: ${error}`);
      return res.status(500).send();
    });
  });

  return router;
}
