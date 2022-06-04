const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);

const userController = require('../controllers/user.controller')

// Create a new User
router.post('/', function (req, res) {
  userController.createUser(req, res);
});

module.exports = router;