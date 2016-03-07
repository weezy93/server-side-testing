var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

function Shows() {
    return knex('shows');
};

router.get('/shows', function(req, res, next) {
  Shows().select().then(function(result) {
    res.status(200).json(result);
  })
});

router.post('/shows', function(req, res, next) {
    Shows().insert({
        name: req.body.name,
        channel : req.body.channel,
        genre: req.body.genre,
        rating: req.body.rating,
        explicit: req.body.explicit
    }, 'id').then(function(result) {
        res.status(200).json(result);
    });
})

module.exports = router;
