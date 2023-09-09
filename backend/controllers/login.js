const jwt = require('jsonwebtoken');
const User = require('../models/user');
const LoginError = require('../errors/login-error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      if (!user) {
        throw new LoginError('Пользователь по указанному _id не найден.');
      } else {
        const token = jwt.sign({ _id: user._id }, 'some-key', { expiresIn: '1d' });
        res.send({ token });
      }
    })
    .catch(() => {
      throw new LoginError('Неправильный логин или пароль');
    })
    .catch(next);
};
