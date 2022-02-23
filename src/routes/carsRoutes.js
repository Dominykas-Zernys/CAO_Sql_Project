const express = require('express');
const {
  carsIndex,
  carsByIdIndex,
  addCar,
  deleteCar,
} = require('../controller/carsController');

const carsRoutes = express.Router();

carsRoutes.get('/cars', carsIndex);
carsRoutes.get('/cars/:id', carsByIdIndex);
carsRoutes.post('/cars', addCar);
carsRoutes.delete('/cars/:id', deleteCar);

module.exports = carsRoutes;
