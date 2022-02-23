/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const carsRoutes = require('./routes/carsRoutes');

const { PORT } = process.env;
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/', carsRoutes);

app.listen(PORT, console.log(`server is running on ${PORT}`));
