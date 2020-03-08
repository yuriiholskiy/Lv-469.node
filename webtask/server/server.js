const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const commentsRoute = require('./routes/commentsRoute');
const newsRoute = require('./routes/newsRoute');

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use('/api/comments', commentsRoute);
app.use('/api/news', newsRoute);

mongoose
  .connect('mongodb://localhost:27017/webtaskDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connection to database established');
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
  });

const PORT = 3012;

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
