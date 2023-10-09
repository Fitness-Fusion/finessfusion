const express = require('express');
const registerApi = require('./register')
const loginApi = require('./login')
const feedsApi = require('./feeds')

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(feedsApi);

module.exports = router;