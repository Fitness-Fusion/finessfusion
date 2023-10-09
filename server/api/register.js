const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models')

const router = express.Router();

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const alreadyExistUser = await User.findOne({ where: { email } }).catch((err) => {
        console.log('Error: ', err);
    })

    if (alreadyExistUser) {
        return res.json({ message: 'User with email already exist!' })
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User ({ firstName, lastName, email, password: hashedPassword });
    const savedUser = await newUser.save().catch((err) => {
        console.log('Error: ', err);
        return res.json({ error: 'Cannot register user at the moment!' })
    });

    if (savedUser) res.json({ message: 'Thanks for registering!'});
});

module.exports = router;