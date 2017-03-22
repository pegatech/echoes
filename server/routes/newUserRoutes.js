var express = require('express');
var router = express.Router();
var path = require('path');
var users = require('../../db/controllers/users');
var util = require('../utilities.js');

// get requests served static signup file
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../../client/signup.html'));
});

// post requests add user to the database and begin session
router.post('/', function (req, res, next) {
  // get username and password from request body
  var user = req.body.user;
  var username = req.body.username;
  var password = req.body.password;

  users.getUser(username)
    .then(user => {

      if (user) {
        res.status(401).redirect('/signup');
      } else {

        // insert new user
        return users.insertUser(user, username, password)
          .then(user => {
            res.cookie('signedIn', true);
            res.cookie('username', username);
            res.status(302).redirect('/');
          });
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
