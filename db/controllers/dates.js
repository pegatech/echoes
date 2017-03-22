var knex = require('../db.js');

exports.getDate = function(impressionId, date) {
  return knex('listen_date')
    .where('album_impression_id', impressionId)
    .where('date', date)
    .then(results => results[0]);
};

exports.getDates = function(impressionId) {
  return knex('listen_date')
    .where('album_impression_id', impressionId);
};

exports.insertDate = function(impressionId, date) {
  return knex('listen_date')
    .returning(['id'])
    .insert({
      date: date,
      'album_impression_id': impressionId
    })
    .then(results => results[0]);
};

exports.deleteDate = function(impressionId, date) {
  return knex('listen_date')
    .where('album_impression_id', impressionId)
    .where('date', date)
    .del();
};
