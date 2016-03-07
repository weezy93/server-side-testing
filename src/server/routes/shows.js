var express = require('express');
var router = express.Router();

router.get('/shows', function(req, res, next) {
  res.status(200).json('testing');
});

module.exports = router;
