var express = require('express');
var router = express.Router();

var path = require('path');
var users = require('../../db/controllers/users');
var util = require('../utilities');

module.exports = function(passport) {

  router.get('/', util.isAuth, function(req, res, next) {

    if (req.query.current) {
      res.json(_.pick(req.user, ['id', 'user', 'username']));
    } else {

      var query = req.query.search || '';

      users.getUsers(query)

        .then(results => {
          res.json(results);
        })

        .catch(err => {
          next(err);
        });
    }
  });

  router.post(
    '/login',
    passport.authenticate('login'),
    function(req, res, next) {
      res.json(_.pick(req.user, ['id', 'user', 'username']));
    }
  );

  router.post(
    '/signup',
    passport.authenticate('signup'),
    function(req, res, next) {
      res.json(_.pick(req.user, ['id', 'user', 'username']));
    }
  );

  router.post('/logout', function(req, res, next) {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
