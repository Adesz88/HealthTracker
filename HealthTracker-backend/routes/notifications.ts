import express, { Request, Response } from "express";
import { Notification } from "../shared/model/notification";

const isAuthenticated = require("../shared/middlewares/is-authenticated");

module.exports = function () {
  const express = require("express");
  const router = express.Router();

  router.get("/", isAuthenticated, (req: Request, res: Response) => {
    const query = Notification.find({ user: req.user }).sort({ date: -1 });
    query.then(notifications => {
      console.log(`/notifications endpoint called by ${req.user}`);
      return res.status(200).send(notifications);
    }).catch(error => {
      console.log(`/notifications endpoint called: error while getting notifications: ${error}`);
      return res.status(500).send();
    });
  });

  router.delete("/", isAuthenticated, (req: Request, res: Response) => {
    const query = Notification.deleteMany({ user: req.user });
    query.then(notifications => {
      console.log(`/notifications delete endpoint called by ${req.user}`);
      return res.status(204).send();
    }).catch(error => {
      console.log(`/notifications delete endpoint called: error while clearing notifications: ${error}`);
      return res.status(500).send();
    });
  });

  return router;
}
