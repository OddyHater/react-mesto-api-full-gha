const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v.length >= 2;
      },
      message: 'name must contain at least 2 characters',
    },
  },

  link: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return isURL(v);
      },
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
