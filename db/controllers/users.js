var knex = require('../db.js');
var util = require('../../server/utilities');

exports.getUser = function(username) {
  return knex('users')
    .where('username', username)
    .then(result => {
      return result[0];
    });
};

exports.getUserById = function(id) {
  return knex('users')
    .where('id', id)
    .then(result => {
      return result[0];
    });
};

exports.insertUser = function(user, username, password) {
  return util.hashPasswordAsync(password)
    .then(hash => {
      return knex('users')
        .returning(['id', 'user', 'username'])
        .insert({ user: user, username: username, password: hash })
        .then(result => {
          return result[0];
        });
    });
};
