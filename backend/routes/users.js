const express = require('express');

const router = express.Router();

const {
  findAllUsersValidation,
  getCurrentUserValidataion,
  updateProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

const {
  findAllUsers,
  findUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', findAllUsersValidation, findAllUsers);

router.get('/users/me', getCurrentUserValidataion, getCurrentUser);
router.patch('/users/me', updateProfileValidation, updateProfile);
router.get('/users/:userId', findAllUsersValidation, findUserById);
router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
