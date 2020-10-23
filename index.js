const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const keys = require('./keys');
const mongoose = require('mongoose');
const { getScoreRouter } = require('./routes/score');
const { createScoreRouter } = require('./routes/score/new');

const app = express();
app.use(bodyParser.json());

const connectToDb = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('🥭 Connected to Mongo');
  } catch (error) {
    console.log('DB connection failed ', error);
  }
};

app.use(getScoreRouter);
app.use(createScoreRouter);

// serve frontend assets in production
if (process.env.NODE_ENV === 'production') {
  const build = path.resolve(__dirname, 'client', 'build');
  app.use('/', express.static(build));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(build, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('🌐 Server up at 3001');
});

connectToDb();
