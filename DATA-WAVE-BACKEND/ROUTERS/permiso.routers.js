const Rutas = require('express').Router();
const permisocontroller = require('../CONTROLLERS/permiso.controllers');

// Retornar todos los permisos http://localhost:3001/permiso/lista
Rutas.get('/lista', permisocontroller.lista);

Rutas.get('/lista/:pag', permisocontroller.listaPag);
Rutas.get('/lista/:pag/:text', permisocontroller.listaPag);

// Retornar permiso según filtro
Rutas.get('/filtrar', permisocontroller.filtrar);

// Nuevo permiso http://localhost:3001/permiso/nuevo
Rutas.post('/nuevo', permisocontroller.nuevo);

// Eliminar un permiso
Rutas.delete('/eliminar/:id', permisocontroller.eliminar);

// Actualizar un permiso
Rutas.put('/actualizar/:id', permisocontroller.actualizar);

module.exports = Rutas;