const mongoose = require('mongoose');

const { Schema } = mongoose;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String
  }
});

module.exports = mongoose.model('news', newsSchema);
