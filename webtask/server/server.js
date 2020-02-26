const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect('mongodb://localhost:27017/defibrillatorDB', {
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
