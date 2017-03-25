var knex = require('../db.js');
var users = require('./users');
var dates = require('./dates');
var artists = require('./artists');
var albums = require('./albums');

exports.getImpressions = function(username) {
  return knex('users')
    .join('album_impression', 'users.id', 'album_impression.user_id')
    .where('users.username', username)
    .join('album', 'album_impression.album_id', 'album.id')
    .join('artist', 'artist.id', 'album.artist_id')
    .join('listen_date', 'listen_date.album_impression_id', 'album_impression.id')
    .select('users.username',
            'listen_date.created_at',
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

exports.getImpressionsById = function(id) {
  return knex('users')
    .join('album_impression', 'users.id', 'album_impression.user_id')
    .where('users.id', id)
    .join('album', 'album_impression.album_id', 'album.id')
    .join('artist', 'artist.id', 'album.artist_id')
    .join('listen_date', 'listen_date.album_impression_id', 'album_impression.id')
    .select('users.username',
            'listen_date.created_at',
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
  return knex('album_impression').where('id', id).update(impression);
};

exports.insertImpression = function(username, album, rating, impression, date) {

  var newImpression = {};

  // don't add rating to update object if undefined
  if (rating) {
    newImpression.rating = rating;
  }

  // don't add impression to update object if undefined
  if (impression) {
    newImpression.impression = impression;
  }

  // set up promises for Promise.all()
  var getUserId = users.getUser(username).then(user => user.id);
  var getAlbumId = artists.getArtist(album.artistName)

    // see if artist is in the database
    .then(artist => {

      // insert artist into the database if it doesn't exist
      if (artist) {
        return artist.id;
      } else {
        return artists.insertArtist(album.artistName).then(artist => artist.id);
      }
    })

    // see if the album is in the database
    .then(artistId => {

      return albums.getAlbum(album.collectionName)
        .then(result => {

          // insert album into the database if it doesn't exist
          if (result) {
            return result.id;
          } else {
            return albums.insertAlbum(
              album.collectionName,
              artistId,
              album.primaryGenreName,
              album.releaseDate.slice(0, 4),
              album.artworkUrl60,
              album.artworkUrl100
            ).then(album => album.id);
          }
        });
    });

  // wait for userId and albumId to come back
  return Promise.all([getUserId, getAlbumId])
    .then(results => {

      var userId = results[0];
      var albumId = results[1];

      // get a user impression
      return exports.getImpression(userId, albumId)
        .then(result => {

          // insert an impression for the user if doesn't exist
          if (result) {
            return result.id;
          } else {

            newImpression['user_id'] = userId;
            newImpression['album_id'] = albumId;

            return knex('album_impression')
              .returning(['id'])
              .insert(newImpression)
              .then(results => results[0].id);
          }
        });
    })

    .then(impressionId => {
      return dates.getDate(impressionId, date)
        .then(listenDate => {

          if (listenDate) {
            var err = new Error('You already listend to this album that day');
            err.status = 400;
            throw err;
          }

          return dates.insertDate(impressionId, date).then(results => results[0]);
        });
    });
};

exports.deleteImpression = function(id) {
  return knex('album_impression')
    .where('id', id)
    .del();
};
