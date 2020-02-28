const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(200).send({
      error: false,
      comments
    });
  } catch(error) {
    return res.status(500).send({error});
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
    return res.status(500).send({error});
  } 
});

module.exports = router;