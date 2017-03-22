var express = require('express');
var router = express.Router();
var path = require('path');
var util = require('../utilities.js');
var knex = require('../../db/db.js');
var impressions = require('../../db/controllers/impressions');
var artists = require('../../db/controllers/artists');
var albums = require('../../db/controllers/albums');
var dates = require('../../db/controllers/dates');
var users = require('../../db/controllers/users');

// queries database and returns user's album entries
router.get('/', function (req, res, next) {
  // get username from the cookie
  var username = req.cookies.username;
  // find all listen instances by the user
  impressions.getImpressions(username)
    .then(function (result) {
      // send the result back to the user
      res.status(200).send(result);
    })
    .catch(function (err) {
      next(err);
    });
});

// post new album to the database
router.post('/', function (req, res, next) {
  var album = req.body.album;
  var date = req.body.date.slice(0, 10);
  var username = req.cookies.username;

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
  Promise.all([getUserId, getAlbumId])
    .then(results => {

      var userId = results[0];
      var albumId = results[1];
      var impression = req.body.impression;
      var rating = req.body.rating;

      // get a user impression
      return impressions.getImpression(userId, albumId)
        .then(impression => {
          // insert an impression for the user if doesn't exist
          if (impression) {
            return impression.id;
          } else {
            return impressions.insertImpression(userId, albumId, rating, impression)
              .then(impression => impression.id);
          }
        });
    })

    .then(impressionId => {
      return dates.getDate(impressionId, date)
        .then(listenDate => {

          if (listenDate) {
            res.status(400).send('You already listend to this album that day');
          } else {
            dates.insertDate(impressionId, date).then(() => {
              res.status(201).send('Successful Post!');
            });
          }
        });
    })

    .catch(err => {
      next(err);
    });
});

// add/update impression
router.post('/update', function (req, res, next) {
  var id = req.body.id;
  var rating = req.body.rating;
  var impression = req.body.impression;
  var update = {};

  if (impression) {
    update.impression = impression;
  }

  if (rating) {
    update.rating = Number(rating);
  }

  // if the user sent a blank save
  if (_.isEmpty(update)) {
    res.end();
  } else {

    impressions.updateImpression(Number(id), update)

      .then(() => {
        res.status(201).end();
      })

      .catch(err => {
        next(err);
      });
  }
});

// remove listen_date
router.post('/delete', function (req, res, next) {
  var entry = req.body;

  // delete the listen_date
  dates.deleteDate(entry.impressionId, entry.date)

    // check if anymore dates are associated with the impression
    .then(() => {
      return dates.getDates(entry.impressionId);
    })

    .then(dates => {
      // delete the impression if there are no more dates
      console.log('dates', dates);
      if (dates.length === 0) {
        return impressions.deleteImpression(entry.impressionId);
      }
    })

    .then(() => {
      res.status(201).send('Successfully removed album');
    })

    .catch(err => {
      next(err);
    });
});

module.exports = router;
