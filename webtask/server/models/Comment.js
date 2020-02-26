const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentsSchema = {
  content: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    required: true
  }
};

module.exports = mongoose.model(
  'comments',
  commentsSchema
);
