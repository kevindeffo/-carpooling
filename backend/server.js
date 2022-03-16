const express = require('express');
const app = require('./app');
// app.set('port', process.env.PORT || 4300);

// const server = express()

app.listen(process.env.PORT || 4400);