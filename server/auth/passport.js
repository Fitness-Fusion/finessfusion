const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { User } = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new StrategyJwt(jwtOptions, function (jwtPayload, done) {
    User.findOne({ where: { id: jwtPayload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);



passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/v1/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ where: { email: profile.emails[0].value } })
          .then((existingUser) => {
            if (existingUser) {
              existingUser.googleId = profile.id;
              existingUser.save()
                .then(() => {
                  const token = jwt.sign({ user: existingUser }, process.env.JWT_SECRET);
                  return done(null, token);
                })
                .catch((err) => {
                    return done(err);
                });
            } else {
              const newUser = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
              });
              newUser.save()
                .then(() => {
                  const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET);
                  return done(null, token);
                })
                .catch((err) => {
                    return done(err);
                });
            }
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
  
  