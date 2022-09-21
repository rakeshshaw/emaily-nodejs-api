const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const { User } = require("../models/user");

mongoose.connect(keys.mongoURI);

// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

passport.serializeUser((user, done) => {
  // done(null, user.id);
  done(null, user); // my way
});

passport.deserializeUser((user, done) => {
  // User.findById(id).then((user) => {
  //   console.log("user", user);
  //   done(null, user);
  // });
  done(null, user); // my way
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      // console.log("profile", profile);
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // We already have a record with this profile
          // console.log("existingUser", existingUser);
          done(null, existingUser);
        } else {
          // we don't have a user with this id so make a new entry
          new User({ googleId: profile.id }).save().then((user) => {
            // console.log("user", user);
            done(null, user);
          });
        }
      });
    }
  )
);
