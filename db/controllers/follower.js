var knex = require('../db.js');

exports.getFollowers = function(username) {
  return knex('follower').where({user_username: username}).then(results => results);
};

exports.addFollower = function(username, followerUsername) {
  return knex('follower')
    .returning(['id'])
    .insert({
      'user_username': username,
      'follower_username': followerUsername
    })
    .then(results =>
      results[0]
    );
};

exports.deleteFollower = function(username, followerUsername) {
  return knex('follower')
    .where('user_username', username)
    .where('follower_username', followerUsername)
    .del();
};