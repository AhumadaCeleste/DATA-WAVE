const Rutas = require('express').Router();
const cohortecontroller = require('../CONTROLLERS/cohorte.controllers');

// Retornar todos los cohorte http://localhost:3001/cohorte/lista
Rutas.get('/lista', cohortecontroller.lista);
Rutas.get('/listafull', cohortecontroller.listafull);

Rutas.get('/lista/:pag', cohortecontroller.listaPag);
Rutas.get('/lista/:pag/:text', cohortecontroller.listaPag);

// Retornar cohorte segun filtro
Rutas.get('/filtrar/:campo/:valor', cohortecontroller.filtrar);

// Nuevo cohorte http://localhost:3001/cohorte/nuevo
Rutas.post('/nuevo', cohortecontroller.nuevo);

// Eliminar un cohorte
Rutas.delete('/eliminar/:id', cohortecontroller.eliminar);

// Actualizar un cohorte
Rutas.put('/actualizar/:id', cohortecontroller.actualizar);

module.exports = Rutas;
