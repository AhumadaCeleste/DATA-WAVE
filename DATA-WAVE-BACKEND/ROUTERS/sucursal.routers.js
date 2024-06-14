const Rutas = require('express').Router();
const sucursalcontroller = require('../CONTROLLERS/sucursal.controllers');
const Auth = require('../MIDDLEWARES/Auth');

// Retornar todos los sucursal http://localhost:3001/sucursal/lista
Rutas.get('/lista', sucursalcontroller.lista);
Rutas.get('/listafull', sucursalcontroller.listafull);

Rutas.get('/lista/:pag', sucursalcontroller.listaPag);
Rutas.get('/lista/:pag/:text', sucursalcontroller.listaPag);

// Retornar sucursal segun filtro
Rutas.get('/filtrar/:campo/:valor', sucursalcontroller.filtrar);

// Nuevo sucursal http://localhost:3001/sucursal/nuevo Agregar,Auth,
Rutas.post('/nuevo', Auth, sucursalcontroller.nuevo);

// Eliminar un sucursal Agregar,Auth,
Rutas.delete('/eliminar/:id', Auth, sucursalcontroller.eliminar);

// Actualizar un sucursal Agregar,Auth,
Rutas.put('/actualizar/:id', sucursalcontroller.actualizar);

module.exports = Rutas;
