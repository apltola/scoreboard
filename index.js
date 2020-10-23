const express = require('express');
const path = require('path');

const app = express();

app.get('/api/hello', (req, res) => {
  res.send('hello hello hello');
});

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
