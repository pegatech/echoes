var express = require('express');
var router = express.Router();
var follower = require('../../db/controllers/follower.js');
var user = require('../../db/controllers/users.js');

router.get('/', function(req, res, next) {
  var username = req.cookies.username;

  user.getUser(username)
    .then(function(result) {
      follower.getFollowers(result.id)
        .then(function(result) {
          res.send(result);
        })
        .catch(function(err) {
          res.send(err);
        });
    });
});

router.post('/', function(req, res, next) {
  var username = req.cookies.username;
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
              follower.addFollower(followId, userId)
                .then(function(result) {
                  res.sendStatus(200);
                })
                .catch(function(err) {
                  console.error(err);
                });
            });
        });
    });
});

router.post('/:follower', function(req, res, next) {
  var username = req.cookies.username;
  var followerUsername = req.params.follower;
  var userId;
  var followId;

  user.getUser(username)
    .then(function(result) {
      userId = result.id;
      user.getUser(followerUsername)
        .then(function(result) {
          followId = result.id;
          follower.deleteFollower(userId, followId)
            .then(function(result) {
              follower.deleteFollower(followId, userId)
                .then(function(result) {
                  res.sendStatus(200);
                })
                .catch(function(err) {
                  console.error(err);
                });
            });
        });
    });
});

module.exports = router;
