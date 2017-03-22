var knex = require('../db.js');

exports.getDate = function(impressionId, date) {
  return knex('listen_date')
    .where('album_impression_id', impressionId)
    .where('date', date)
    .then(results => {
      return results[0];
    });
};

exports.insertDate = function(impressionId, date) {
  return knex('listen_date')
    .returning(['id'])
    .insert({
      date: date,
      'album_impression_id': impressionId
    })
    .then(results => {
      return results[0];
    });
};
