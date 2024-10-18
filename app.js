const express = require('express');
const { API_VERSION } = require('./constants');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authRoutes = require('./src/routes/auth');

app.use(bodyParser.json())

app.use(cors());
console.log(`api/${API_VERSION}`);
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;
