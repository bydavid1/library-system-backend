const User = require('../models').User;

class UserController {
  constructor() {}

  static createUser(req, res) {
    if (!req.body.role_id || !req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name) {
      res.status(400).send({
        msg: 'Given data was invalid'
      })
    } else {
      User.create({
          email: req.body.email,
          password: req.body.password,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          role_id: req.body.role_id
        })
        .then((user) => res.status(201).send(user))
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    }
  }
}

module.exports = UserController;