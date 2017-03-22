var express = require('express');
var router = express.Router();
var path = require('path');
var users = require('../../db/controllers/users');
var util = require('../utilities.js');

// get requests are served static sign in page
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../../client/signin.html'));
});

// post requests check username and password and redirect
router.post('/', function (req, res, next) {
  // get username and password from request body
  var username = req.body.username;
  var password = req.body.password;

  // knex query to search database for user
  users.getUser(username)
    .then(user => {

      // check if user exists
      if (!user) {
        res.status(401).redirect('/signin');
      } else {

        util.checkPassword(password, user.password, (err, result) => {

          if (err) {
            next(err);
          }

          // check for valid password
          if (result) {

            // set cookies and redirect to dashboard
            res.cookie('signedIn', true);
            res.cookie('username', username);
            res.redirect('/');

          } else {
            res.status(401).redirect('/signin');
          }
        });
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
