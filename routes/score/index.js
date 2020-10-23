const express = require('express');
const Score = require('../../models/Score');

const router = express.Router();

router.get('/api/score', async (req, res) => {
  const scores = await Score.find({});

  res.send(scores);
});

module.exports = {
  getScoreRouter: router,
};
