const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../config/passport')(passport);

const bookController = require('../controllers/book.controller')

/// Create a new book
router.post('/', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  bookController.createBook(req, res);
});

/// Get all book
router.get('/', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  bookController.getAllBooks(req, res);
});


/// search by title, author or genre
router.get('/search', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  bookController.searchBooks(req, res);
});


module.exports = router;