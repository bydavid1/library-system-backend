const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../config/passport')(passport);

const bookController = require('../controllers/book.controller')
const borrowingController = require('../controllers/borrowing.controller')

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
router.post('/search', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  bookController.searchBooks(req, res);
});

router.post('/:id/request', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  bookController.requestBook(req, res);
});

router.put('/borrowing/:id/confirm', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  borrowingController.confirmBorrowing(req, res);
});

router.put('/borrowing/:id/refuse', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  borrowingController.refuseBorrowing(req, res);
});

router.put('/return/:borrowing_id', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  bookController.returnBook(req, res);
});

module.exports = router;