const express = require('express');
const router = express.Router();
const passport = require('passport');
const BorrowingController = require('../controllers/borrowing.controller');
require('../config/passport')(passport);

/// Get all borrowings
router.get('/', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  BorrowingController.getAllBorrowings(req, res);
});

router.get('/user', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  BorrowingController.getBorrowingsByUser(req, res);
});

module.exports = router;