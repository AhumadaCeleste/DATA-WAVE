const Rutas = require('express').Router();
const ciudadcontroller = require('../CONTROLLERS/ciudad.controllers');
const Auth = require('../MIDDLEWARES/Auth');

// Retornar todos los ciudad http://localhost:3001/ciudad/lista
Rutas.get('/lista', ciudadcontroller.lista);
Rutas.get('/listafull', ciudadcontroller.listafull);

Rutas.get('/lista/:pag', ciudadcontroller.listaPag);
Rutas.get('/lista/:pag/:text', ciudadcontroller.listaPag);

// Retornar ciudad segun filtro
Rutas.get('/filtrar/:campo/:valor', ciudadcontroller.filtrar);

// Nueva ciudad http://localhost:3001/ciudad/nuevo
Rutas.post('/nuevo', Auth, ciudadcontroller.nuevo);

// Eliminar un ciudad
Rutas.delete('/eliminar/:id', Auth, ciudadcontroller.eliminar);

// Actualizar un ciudad
Rutas.put('/actualizar/:id', ciudadcontroller.actualizar);

module.exports = Rutas;
