var express = require('express');
var router = express.Router();

var path = require('path');
var users = require('../../db/controllers/users');
var util = require('../utilities');

module.exports = function(passport) {

  router.get('/', util.isAuth, function(req, res, next) {
    res.json({
      id: req.user.id,
      username: req.user.username
    });
  });

  router.post(
    '/login',
    passport.authenticate('login'),
    function(req, res, next) {
      res.sendStatus(200);
    }
  );

  router.post(
    '/signup',
    passport.authenticate('signup'),
    function(req, res, next) {
      res.sendStatus(200);
    }
  );

  router.post('/logout', function(req, res, next) {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
