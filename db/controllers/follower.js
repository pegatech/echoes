var knex = require('../db.js');

exports.getFollowers = function(id) {
  return knex('following').where({'user_id': id}).then(results => results);
};

exports.addFollower = function(id, followerId) {
  return knex('following')
    .returning(['id'])
    .insert({
      'user_id': id,
      'follower_id': followerId
    })
    .then(results => results[0]);
};

exports.deleteFollower = function(id, followerId) {
  return knex('following')
    .where('user_id', id)
    .where('follower_id', followerId)
    .del();
};
