const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
  async register(req, res) {
    try {
      const { username, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        res.status(401).json({ message: 'Аутентификация не удалась' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Аутентификация не удалась' });
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      res.status(500).json({ message: 'Ошибка при входе пользователя' });
    }
  },
};

module.exports = authController;
