const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')

router.post('/login', function (req, res) {
    authController.login(req, res);
});

module.exports = router;