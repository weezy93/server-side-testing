var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

function Shows() {
    return knex('shows');
};

router.get('/shows', function(req, res, next) {
  res.status(200).json('testing');
});

module.exports = router;
