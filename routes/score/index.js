const express = require('express');
const Score = require('../../models/Score');

const router = express.Router();

router.get('/api/score', async (req, res) => {
  const scores = await Score.find({});

  const sortedByHighScore = scores.sort((a, b) => {
    return b.score - a.score;
  });

  res.send(sortedByHighScore);
});

module.exports = {
  getScoreRouter: router,
};
