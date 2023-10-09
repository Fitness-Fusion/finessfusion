const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/feeds', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('news Feed')
});

module.exports = router;