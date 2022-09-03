const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const { hrefRegex } = require('../regex/hrefRegex');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteCardLike,
} = require('../controllers/cards');

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required()
      .custom((cardId, helpers) => {
        if (ObjectId.isValid(cardId)) {
          return cardId;
        }
        return helpers.message('Невалидный id');
      }),
  }),
});

router.get('/', getCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom((href, helpers) => {
        if (hrefRegex.test(href)) {
          return href;
        }
        return helpers.message('Невалидная ссылка');
      }),
    }),
  }),
  createCard,
);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, deleteCardLike);

module.exports = router;
