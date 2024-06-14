const Rutas = require('express').Router();
const tipoinstitutocontroller = require(
    '../CONTROLLERS/tipoinstituto.controllers'
);

// Retornar todos los tipos de instituto
// http://localhost:3001/tipoinstituto/lista
Rutas.get('/lista', tipoinstitutocontroller.lista);

Rutas.get('/lista/:pag', tipoinstitutocontroller.listaPag);
Rutas.get('/lista/:pag/:text', tipoinstitutocontroller.listaPag);

// Retornar instituto segun filtro
Rutas.get('/filtrar/:campo/:valor', tipoinstitutocontroller.filtrar);

// Nuevo instituto http://localhost:3001/tipoinstituto/nuevo
Rutas.post('/nuevo', tipoinstitutocontroller.nuevo);

// Eliminar un instituto
Rutas.delete('/eliminar/:id', tipoinstitutocontroller.eliminar);

// Actualizar un instituto
Rutas.put('/actualizar/:id', tipoinstitutocontroller.actualizar);

module.exports = Rutas;

