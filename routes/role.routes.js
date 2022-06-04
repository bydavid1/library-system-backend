const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);

const roleController = require('../controllers/role.controller')

/// Create a new role
router.post('/', (req, res) => {
  roleController.createRole(req, res);
});

/// Get all roles
router.get('/', (req, res) => {
  roleController.getAllRoles(req, res);
});

module.exports = router;