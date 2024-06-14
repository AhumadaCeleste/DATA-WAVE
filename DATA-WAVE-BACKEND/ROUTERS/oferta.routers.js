const Rutas = require('express').Router();
const ofertacontroller = require('../CONTROLLERS/oferta.controllers');

// Retornar todos los oferta http://localhost:3001/oferta/lista
Rutas.get('/lista', ofertacontroller.lista);
Rutas.get('/listafull', ofertacontroller.listafull);
Rutas.get('/listafullquery', ofertacontroller.listafullquery);

Rutas.get('/OfertasUnicas/:pag/:text?', ofertacontroller.listaOfertaUnicaPag);


Rutas.get('/lista/:pag', ofertacontroller.listaPag);
Rutas.get('/lista/:pag/:text', ofertacontroller.listaPag);

// Retornar oferta según filtro
Rutas.get('/filtrar/:campo/:valor', ofertacontroller.filtrar);

// Nuevo oferta http://localhost:3001/oferta/nuevo
Rutas.post('/nuevo', ofertacontroller.nuevo);

// Eliminar un oferta
Rutas.delete('/eliminar/:id', ofertacontroller.eliminar);

// Actualizar un oferta
Rutas.put('/actualizar/:id', ofertacontroller.actualizar);

module.exports = Rutas;