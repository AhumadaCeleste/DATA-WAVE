const Rutas = require('express').Router();
const rolcontroller = require('../CONTROLLERS/rol.controllers');

// Retornar todos losrol http://localhost:3001/rol/lista
Rutas.get('/lista', rolcontroller.lista);

Rutas.get('/lista/:pag/:text', rolcontroller.listaPag); //por pagina
Rutas.get('/lista/:pag', rolcontroller.listaPag); // por texto

// Retornar rol segun filtro
Rutas.get('/filtrar/:campo/:valor', rolcontroller.filtrar);

// Nuevo rol http://localhost:3001/rol/nuevo
Rutas.post('/nuevo', rolcontroller.nuevo);

// Eliminar un rol
Rutas.delete('/eliminar/:id', rolcontroller.eliminar);

// Actualizar un rol
Rutas.put('/actualizar/:id', rolcontroller.actualizar);

module.exports = Rutas;