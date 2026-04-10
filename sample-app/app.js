const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hola desde la app');
});

app.get('/saludo/:nombre', (req, res) => {
  res.send(`Hola, ${req.params.nombre}`);
});

module.exports = app;
