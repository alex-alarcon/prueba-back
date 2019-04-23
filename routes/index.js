var express = require('express');
var router = express.Router();

router.get('/mi-servicio', function(req, res, next) {
  res.status(200);
  res.json(
    [
      {id: 1, name: 'Boeing'},
      {id: 2, name: 'Airbus'}
    ]
  );
});

module.exports = router;
