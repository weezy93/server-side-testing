var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

function Shows() {
    return knex('shows');
}

router.get('/shows', function(req, res, next) {
  // res.status(200).json('testing');
  Shows().select().then(function(result){
  	res.status(200).json(result);
  });
});

router.get('/show/:id', function(req, res, next){
	Shows().where({id: req.params.id}).select().then(function(result){
  	res.status(200).json(result[0]);
	});
});

router.post('/shows', function(req, res, next){
	Shows().insert(req.body).returning('id').then(function(result){
		res.status(200).json(result[0]);
	});
});

router.put('/show/:id', function(req, res, next){
	Shows().update(req.body).where('id',req.params.id).returning('id').then(function(result){
		res.status(200).json(result[0]);
	});
});

router.delete('/show/:id', function(req, res, next){
	Shows().delete().where('id', req.params.id).then(function(result){
		Shows().select().then(function(result){
			res.status(200).json(result);
		});
	});
});


// on delete test, can also NOT do a GET all shows and just delete, then a GET where id, and in the route catch(function(result){res.status(200).json(result)}) and the catch result will be empty



module.exports = router;