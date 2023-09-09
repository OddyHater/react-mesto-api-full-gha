const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const linkPattern = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;

// User validators
const findAllUsersValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom((value, helper) => {
      if (mongoose.isValidObjectId(value)) {
        return value;
      }
      return helper.message('ID is not correct');
    }),
  }).unknown(),
});

const getCurrentUserValidataion = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom((value, helper) => {
      if (mongoose.isValidObjectId(value)) {
        return value;
      }
      return helper.message('ID is not correct');
    }),
  }).unknown(),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkPattern),
  }).unknown(),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkPattern),
  }).unknown(),
});
// User validators

// Card Validators
const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkPattern),
  }).unknown(),
  params: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required(),
    }).unknown(),
  }).unknown(),
});

const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helper) => {
      if (mongoose.isValidObjectId(value)) {
        return value;
      }
      return helper.message('ID is not correct');
    }),
  }),
});

const likeCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helper) => {
      if (mongoose.isValidObjectId(value)) {
        return value;
      }
      return helper.message('ID is not correct');
    }),
  }).unknown(),
});
// Card Validators

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  // users
  findAllUsersValidation,
  getCurrentUserValidataion,
  updateProfileValidation,
  updateAvatarValidation,
  createUserValidation,
  loginValidation,
  // users
  //
  // cards
  createCardValidator,
  deleteCardValidator,
  likeCardValidator,
  // cards
};
