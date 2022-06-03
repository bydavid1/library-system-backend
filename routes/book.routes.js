const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const passport = require('passport');
require('../config/passport')(passport);

/// Create a new role
router.post('/', (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.published_year || !req.body.genre) {
    res.status(400).send({
        msg: 'Given data was invalid'
    })
  } else {
    Book
      .create({
          title: req.body.title,
          author: req.body.author,
          published_year: req.body.published_year,
          genre: req.body.genre
      })
      .then((book) => res.status(201).send(book))
      .catch((error) => {
          console.log(error);
          res.status(400).send(error);
      });
  }
});

/// Get all roles
router.get('/', (req, res) => {
  Book
  .findAll()
  .then((books) => res.status(200).send(books))
  .catch((error) => {
      res.status(400).send({
          success: false,
          msg: error
      });
  });
});

module.exports = router;