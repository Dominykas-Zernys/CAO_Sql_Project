/* eslint-disable object-curly-newline */
const {
  getCarsFromDb,
  addOneCarToDb,
  deleteOneCar,
  getCarByIdFromDb,
} = require('../models/carsmodel');

async function carsIndex(req, res) {
  const allCars = await getCarsFromDb();
  if (allCars === false) {
    res.status(500);
    return;
  }
  res.json(allCars);
}

async function carsByIdIndex(req, res) {
  const { id } = req.params;
  const foundCars = await getCarByIdFromDb(id);
  if (foundCars === false) {
    res.status(500).json('something is wrong');
    return;
  }
  res.json(foundCars);
}

async function addCar(req, res) {
  const newCarAdded = await addOneCarToDb(req.body);
  if (newCarAdded === false) {
    res.status(500);
    return;
  }
  res.json(newCarAdded);
}

async function deleteCar(req, res) {
  const deletedCar = await deleteOneCar(req.params.id);
  if (deletedCar === false) {
    res.status(500);
    return;
  }
  res.json(deletedCar);
}

module.exports = {
  carsIndex,
  addCar,
  deleteCar,
  carsByIdIndex,
};
