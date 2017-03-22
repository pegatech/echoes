var knex = require('../db.js');

exports.getArtist = function(name) {
  return knex('artist').where({ name: name });
};

exports.insertArtist = function(name) {
  return knex('artist')
    .returning(['id'])
    .insert({ name: name })
    .then(results => {
      return results[0];
    });
};
