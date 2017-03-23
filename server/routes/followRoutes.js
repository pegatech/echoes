var express = require('express');
var router = express.Router();
var follower = require('../../db/controllers/follower.js');
var user = require('../../db/controllers/users.js');
var util = require('../utilities');
var impressions = require('../../db/controllers/impressions');

router.get('/', util.isAuth, function(req, res, next) {
  var username = req.user.username;

  user.getUser(username)
    .then(function(result) {
      follower.getFollowers(result.id)
        .then(function(result) {
          user.getUserById(result[1].follower_id)
            .then(function(result) {
              impressions.getImpressions(result.username)
                .then(function(result) {
                  res.send(result);
                });
            });
        });
    });
});

router.post('/', util.isAuth, function(req, res, next) {
  var username = req.user.username;
  var followerUsername = req.body.follower;
  var userId;
  var followId;

  user.getUser(username)
    .then(function(result) {
      userId = result.id;
      user.getUser(followerUsername)
        .then(function(result) {
          followId = result.id;
          follower.addFollower(userId, followId)
            .then(function(result) {
              res.sendStatus(200);
            })
            .catch(function(err) {
              console.error(err);
            });
        });
    });
});

router.post('/:follower', util.isAuth, function(req, res, next) {
  var username = req.user.username;
  var followerUsername = req.params.follower;
  var userId;

  user.getUser(username)
    .then(function(result) {
      userId = result.id;
      user.getUser(followerUsername)
        .then(function(result) {
          follower.deleteFollower(userId, result.id)
            .then(function(result) {
              res.sendStatus(200);
            })
            .catch(function(err) {
              console.error(err);
            });
        });
    });
});

module.exports = router;
