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
  var rating = req.body.rating;
  var impression = req.body.impression;
  var date = req.body.date.slice(0, 10);
  var username = req.cookies.username;


  // insert the impression
  impressions.insertImpression(username, album, rating, impression, date)

    // if impression inserted successfully
    .then(() => {
      res.status(200).send('Successful Post!');
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
