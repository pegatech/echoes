var express = require('express');
var router = express.Router();
var path = require('path');
var util = require('../utilities.js');
var knex = require('../../db/db.js');

router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;
