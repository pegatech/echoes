var knex = require('../db.js');

exports.getImpressions = function(username) {
  return knex('users')
    .join('album_impression', 'users.id', 'album_impression.user_id')
    .where('users.username', username)
    .join('album', 'album_impression.album_id', 'album.id')
    .join('artist', 'artist.id', 'album.artist_id')
    .join('listen_date', 'listen_date.album_impression_id', 'album_impression.id')
    .select('users.user',
            'listen_date.date',
            'album.title',
            'artist.name',
            'album.genre',
            'album.year',
            'album_impression.rating',
            'album_impression.impression',
            'album_impression.id',
            'album.art_url60',
            'album.art_url100')
    .orderBy('listen_date.date', 'desc');
};

exports.getImpression = function(userId, albumId) {
  return knex('album_impression')
    .where('user_id', userId)
    .where('album_id', albumId)
    .then(results => {
      return results[0];
    });
};

exports.updateImpression = function(id, impression) {
  return knex('album_impression').where('id', id).update(impression).then();
};

exports.insertImpression = function(userId, albumId) {
  return knex('album_impression')
    .returning(['id'])
    .insert({
      'user_id': userId,
      'album_id': albumId
    })
    .then(results => {
      return results[0];
    });
};

exports.deleteImpression = function(id) {
  return knex('album_impression')
    .where('id', id)
    .del();
};
