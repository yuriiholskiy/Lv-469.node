const express = require('express');
const New = require('../models/New');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const articles = await New.find();
    return res.status(200).send({
      error: false,
      articles
    });
  } catch(error) {
    return res.status(500).send({error});
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const article = await New.create(body);
    return res.status(201).send({
      error: false,
      article
    });
  } catch(error) {
    return res.status(500).send({error});
  } 
});

module.exports = router;