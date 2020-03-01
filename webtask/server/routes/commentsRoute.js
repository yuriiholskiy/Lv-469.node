const express = require('express');
const Comment = require('../models/Comment');
const serverErrorHandler = require('../shared/serverError');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(200).send({
      error: false,
      comments
    });
  } catch(error) {
    serverErrorHandler(res, error);
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const comment = await Comment.create(body);
    return res.status(201).send({
      error: false,
      comment
    });
  } catch(error) {
    serverErrorHandler(res, error);
  } 
});

module.exports = router;