const express = require('express');
const Score = require('../../models/Score');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validateRequest');

const router = express.Router();

router.post(
  '/api/score',
  [
    body('player')
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('Player name must be 1 to 20 characters'),
    body('score').isNumeric().withMessage('Score must be a number'),
  ],
  validateRequest,
  async (req, res) => {
    const { player, score } = req.body;

    const newScore = new Score({
      player,
      score,
    });
    await newScore.save();

    res.send(newScore);
  }
);

module.exports = {
  createScoreRouter: router,
};
