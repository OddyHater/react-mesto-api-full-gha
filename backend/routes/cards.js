const express = require('express');

const router = express.Router();

const {
  findAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidator,
  deleteCardValidator,
  likeCardValidator,
} = require('../middlewares/validation');

router.get('/cards', findAllCards);
router.post('/cards', createCardValidator, createCard);
router.delete('/cards/:cardId', deleteCardValidator, deleteCard);
router.put('/cards/:cardId/likes', likeCardValidator, likeCard);
router.delete('/cards/:cardId/likes', likeCardValidator, dislikeCard);

module.exports = router;
