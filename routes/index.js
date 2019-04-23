const express = require('express');
const router = express.Router();

const validar = require('../utils/validator');

router.get('/mi-servicio', (req, res, next) => {
  res.status(200);
  res.json(
    [
      {id: 1, name: 'Boeing'},
      {id: 2, name: 'Airbus'}
    ]
  );
});

router.post('/form', (req, res, next) => {
  const errores = validar(req.body);
  if (errores instanceof Error) {
    return next(errores);
  }
  console.log(req.body);
  res.status(200);
  res.end();
})

module.exports = router;
