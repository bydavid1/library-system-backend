const express = require('express');
const router = express.Router();
const passport = require('passport');
const BorrowingController = require('../controllers/borrowing.controller');
require('../config/passport')(passport);


/// Get all borrowings
router.get('/', (req, res) => {
  BorrowingController.getAllBorrowings(req, res);
});

module.exports = router;