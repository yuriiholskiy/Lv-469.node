const express = require('express');
const New = require('../models/New');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const news = await New.find();
    return res
      .status(200)
      .send(news);
  } catch(e) {
    throw e;
  }
});

router.post('/', async (req, res) => {
  try {
    const new = await New.create(
      req.body
    );
    return res.status(201).send({
      error: false,
      defibrillator
    });
  } catch (e) {
    throw e;
  }
});
