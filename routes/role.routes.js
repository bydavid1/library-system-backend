const express = require('express');
const router = express.Router();
const Role = require('../models').Role;
const passport = require('passport');
require('../config/passport')(passport);

/// Create a new role
router.post('/', (req, res) => {
  if (!req.body.role_name || !req.body.role_description) {
    res.status(400).send({
        msg: 'Given data was invalid'
    })
  } else {
    Role
      .create({
          role_name: req.body.role_name,
          role_description: req.body.role_description
      })
      .then((role) => res.status(201).send(role))
      .catch((error) => {
          console.log(error);
          res.status(400).send(error);
      });
  }
});

/// Get all roles
router.get('/', (req, res) => {
  Role
  .findAll()
  .then((roles) => res.status(200).send(roles))
  .catch((error) => {
      res.status(400).send({
          success: false,
          msg: error
      });
  });
});

module.exports = router;