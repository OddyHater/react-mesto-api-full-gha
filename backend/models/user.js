const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');

const userSchema = mongoose.Schema({

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'Please enter a valid email address',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v.length >= 2;
      },
      message: 'Name must contain at least 2 characters',
    },
  },

  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v.length >= 2;
      },
      message: 'about must contain at least 2 characters',
    },
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return isURL(v);
      },
    },
    message: 'Неверный формат ссылки на аватар',
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
