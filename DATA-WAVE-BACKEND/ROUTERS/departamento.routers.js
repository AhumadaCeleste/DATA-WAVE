const Rutas = require('express').Router();
const departamentocontroller = require(
    '../CONTROLLERS/departamento.controllers'
);

// Retornar todos los ciudad http://localhost:3001/ciudad/lista
Rutas.get('/lista', departamentocontroller.lista);

Rutas.get('/lista/:pag', departamentocontroller.listaPag);
Rutas.get('/lista/:pag/:text', departamentocontroller.listaPag);

// Retornar ciudad segun filtro
Rutas.get('/filtrar/:campo/:valor', departamentocontroller.filtrar);

// Nuevo ciudad http://localhost:3001/ciudad/nuevo
Rutas.post('/nuevo', departamentocontroller.nuevo);

// Eliminar un ciudad
Rutas.delete('/eliminar/:id', departamentocontroller.eliminar);

// Actualizar un ciudad
Rutas.put('/actualizar/:id', departamentocontroller.actualizar);

module.exports = Rutas;
