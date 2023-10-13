const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const googleUser = req.user;

    User.findOne({ where: { email: googleUser.email } })
      .then((existingUser) => {
        if (existingUser) {
          existingUser.googleId = googleUser.id;
          existingUser.save()
            .then(() => {
              const token = jwt.sign({ user: existingUser }, process.env.JWT_SECRET);
              res.json({ token });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: 'Internal Server Error' });
            });
        } else {
          const newUser = new User({
            googleId: googleUser.id,
            email: googleUser.email,
          });
          newUser.save()
            .then(() => {
              const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET);
              res.json({ token });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: 'Internal Server Error' });
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }
);

module.exports = router;
