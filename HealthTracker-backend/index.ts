import { Request, Response } from "express";
import mongoose from "mongoose";

const express = require('express');
const dbURL = "mongodb://localhost:6000/health_tracker";
const bcrypt = require("bcrypt");
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
mongoose.connect(dbURL).then((_) => {
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

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use("/users", require("./routes/users")(passport));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
