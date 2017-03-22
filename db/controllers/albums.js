var knex = require('../db.js');

exports.getAlbum = function(name) {
  return knex('album').where({ name: name });
};

exports.getAlbumById = function(id) {
  return knex('album').where({ id: id });
};

exports.insertAlbum = function(title, artistId, genre, year, art60, art100) {
  return knex('album')
    .returning(['id'])
    .insert({
      title: title,
      'artist_id': artistId,
      genre: genre,
      year: year,
      'art_url60': art60,
      'art_url100': art100
    })
    .then(results => {
      return results[0];
    });
};
