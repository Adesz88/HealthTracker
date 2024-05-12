import { Request, Response } from "express";
import mongoose from "mongoose";
import { DB_URL } from "./constants";

const express = require('express');
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

/* mongodb */
mongoose.connect(DB_URL).then((_) => {
    console.log("connceted to DB");
}).catch(error => {
    console.log(error);
    return;
});

/* passport */
const initializePassport = require("./shared/passport-config");
initializePassport(passport);
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", require("./routes/users")(passport));
app.use("/measurements", require("./routes/measurements")());
app.use("/notifications", require("./routes/notifications")());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
