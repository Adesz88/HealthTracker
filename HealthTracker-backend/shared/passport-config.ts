import {PassportStatic} from "passport";
import {User} from "./model/user";

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport: PassportStatic) {
  const authenticateUser = (email: string, password: string, done: any) => {
    const query = User.findOne({ email: email });
    query.then(user => {
      if (user) {
        user.comparePassword(password, (error, match) => {
          if (error || !match) {
            done('Incorrect username or password.');
          } else {
            done(null, user._id);
          }
        });
      } else {
        done(null, undefined);
      }
    }).catch(error => {
      done(error);
    })
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
