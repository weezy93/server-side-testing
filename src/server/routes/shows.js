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

router.get('/show/:id', function(req, res, next) {
    Shows().where('id', req.params.id).first()
    .then(function(result) {
        res.status(200).json(result);
    })
})

router.post('/shows', function(req, res, next) {
    Shows().insert(req.body, 'id').then(function(result) {
        res.status(200).json(result);
    });
});

router.put('/show/:id', function(req, res, next) {
    Shows().where('id', req.params.id)
    .update(req.body)
    .then(function(result){
        res.status(200).json(result);
    })
})

router.delete('/show/:id', function(req, res, next) {
    Shows().where('id', req.params.id).del()
    .then(function(result) {
        res.status(200).json(result);
    })
})

module.exports = router;
