const bcrypt = require('bcrypt');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const EmailError = require('../errors/email-err');

module.exports.findAllUsers = (req, res, next) => { // GET
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      next(new BadRequestError('Пользователь по указанному _id не найден.'));
    });
};

// eslint-disable-next-line consistent-return
module.exports.findUserById = (req, res, next) => { // GET
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Пользователь по указанному _id не найден.');
      }
      res.status(200).send({ user });
    })
    .catch(() => {
      next(new BadRequestError('Пользователь по указанному _id не найден.'));
    });
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => { // POST
  const
    {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
  }

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then(() => res.status(200).send({
          data: {
            email,
            name,
            about,
            avatar,
          },
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new EmailError('Пользователем с таким email уже существует'));
          }
          return next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.updateProfile = (req, res, next) => { // PATCH
  const { name, about } = req.body;
  if (!name || !about) {
    throw new BadRequestError('Переданы некорректные данные при обновлении профиля.');
  }
  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then(() => res.status(200).send({ name, about }))
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.updateAvatar = (req, res, next) => { // PATCH
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequestError('Переданы некорректные данные при обновлении аватара.');
  }

  User.findByIdAndUpdate(
    req.params.userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then(() => res.status(200).send({ avatar }))
    .catch(() => {
      next(new BadRequestError('Пользователь по указанному _id не найден.'));
    });
};
