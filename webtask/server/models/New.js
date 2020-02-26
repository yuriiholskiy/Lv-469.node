const mongoose = require('mongoose');

const { Schema } = mongoose;

const newsSchema = {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  }
};

module.exports = mongoose.model(
  'news',
  newsSchema
);
