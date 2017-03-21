var knex = require('../db.js');

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
