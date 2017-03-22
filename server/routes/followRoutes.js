var express = require('express');
var router = express.Router();
var follower = require('../../db/controllers/follower.js');

router.get('/', function(req, res, next) {
  var username = req.cookies.username;

  follower.getFollowers(username)
    .then(function(result) {
      res.send(result);
    })
    .catch(function(err) {
      console.error(err);
    });
});

router.post('/', function(req, res, next) {
  var username = req.cookies.username;
  var follower = req.body.follower;

  follower.addFollower(username, follower)
    .then(function(result) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });
});

router.post('/:username', function(req, res, next) {
  var username = req.cookies.username;
  var follower = req.params.username;

  follower.deleteFollower(username, follower)
    .then(function(result) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });
});

module.exports = routers;