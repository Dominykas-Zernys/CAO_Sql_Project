/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getCarsFromDb() {
  try {
    console.log(dbConfig);
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.query('SELECT * FROM cars');
    await connection.close();
    return result;
  } catch (error) {
    console.log('getCarsFromDb', error);
    return false;
  }
}

async function getCarByIdFromDb(id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.query('SELECT * FROM cars WHERE id = ?', [
      id,
    ]);
    await connection.close();
    if (!result[0]) {
      return 'no such car found';
    }
    return result;
  } catch (error) {
    console.log('getCarByIdFromDb', error);
    return false;
  }
}

async function addOneCarToDb(newCar) {
  try {
    const sql =
      'INSERT INTO cars (title, image, price, number_plates) VALUES (?, ?, ?, ?)';
    const { title, image, price, numberPlates } = newCar;
    if (!title || !image || !price || !numberPlates) {
      return 'not enough data to create a new car';
    }
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(sql, [
      title,
      image,
      price,
      numberPlates,
    ]);
    await connection.close();
    return result;
  } catch (error) {
    console.log('addOneCarToDb', error);
    return false;
  }
}

async function deleteOneCar(idToDelete) {
  try {
    const sql = 'DELETE FROM cars WHERE id=?';
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(sql, [idToDelete]);
    await connection.close();
    if (!result.affectedRows) {
      return 'no car was detected';
    }
    return result;
  } catch (error) {
    console.log('deleteOneCar', error);
    return false;
  }
}

module.exports = {
  getCarsFromDb,
  addOneCarToDb,
  deleteOneCar,
  getCarByIdFromDb,
};
