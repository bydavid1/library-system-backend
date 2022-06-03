const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../models').User;

// bring passport as parameter
require('../config/passport')(passport);

router.post('/login', function (req, res) {

    // find user by email
    User
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if (!user) {
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
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            })
        })
        .catch((error) => res.status(400).send(error));
});

module.exports = router;