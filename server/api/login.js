const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userWithEmail = await User.findOne({ where: { email } }).catch((err) => {
        console.log('Error: ', err);
    })

    if (!userWithEmail)
        return res.json({ message: 'Email or password does not match!' });

    const passwordMatch = await bcrypt.compare(password, userWithEmail.password);

    if (!passwordMatch)
        return res.json({ message: 'Email or password does not match!' });

    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET);

    res.cookie('jwtToken', jwtToken, { httpOnly: true });
    res.json({ message: 'Welcome!', token: jwtToken });
})

module.exports = router;