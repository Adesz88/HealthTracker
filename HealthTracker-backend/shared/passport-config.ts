import {PassportStatic} from "passport";
import {User} from "./model/user";

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport: PassportStatic) {
  const authenticateUser = (email: string, password: string, done: any) => {
    if (email === 'test@test.com' && password === 'testpw') {
      done(null, new User(email, password));
    } else {
      done('Incorrect username or password.');
    }
  };

  passport.use(new LocalStrategy({usernameField: "email"}, authenticateUser));

  passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });
}

module.exports = initialize;
