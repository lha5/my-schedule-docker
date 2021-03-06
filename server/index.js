const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');

app.use(express.json());

mongoose
  .connect(process.env.MongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB is connected...'))
  .catch((error) => console.error('MongoDB connecting ERROR: ', error));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.use('/my-schedule/api/user', require('./routes/user'));
app.use('/my-schedule/api/schedule', require('./routes/schedule'));
app.use('/my-schedule/api/calendar', require('./routes/calendar'));
app.use('/my-schedule/api/challenge', require('./routes/challenge'));

// error handler function
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.use('/upload', express.static('upload'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static('client/build'));

  // index.html for all page routes    html or routing and navigation
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
