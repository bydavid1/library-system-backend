const User = require('../models').User;
const Role = require('../models').Role;
const jwt = require('jsonwebtoken');

class AuthController {
  constructor() {}

  static login(req, res) {
    User.findOne({
            where: {
                email: req.body.email
            },
            include: Role
        })
        .then((user) => {
            if (!user) {
                console.log('Authentication failed. User not found.');
                return res.status(401).send({
                    message: 'Authentication failed. User not found.',
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {
                        expiresIn: 86400 * 30
                    });
                    jwt.verify(token, 'nodeauthsecret', function (err, data) {
                        console.log(err, data);
                    })

                    res.json({
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        role_name: user.Role.role_name,
                        token: 'JWT ' + token
                    });
                } else {
                    console.log('Authentication failed. Wrong password.');
                    res.status(401).send({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }
            })
        })
        .catch((error) => res.status(400).send(error));
  }
}

module.exports = AuthController;