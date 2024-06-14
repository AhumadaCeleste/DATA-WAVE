const Rutas = require('express').Router();
const institutocontroller = require('../CONTROLLERS/instituto.controllers');

// Retornar todos los instituto http://localhost:3001/instituto/lista
Rutas.get('/lista', institutocontroller.lista);
Rutas.get('/listafull', institutocontroller.listafull);
Rutas.get('/listaquery', institutocontroller.listaquery);
Rutas.get('/listaqueryfiltro', institutocontroller.listaqueryfiltro);
Rutas.get('/listaqueryfiltro/:pag', institutocontroller.listaqueryfiltro);
Rutas.get('/listaqueryfiltro/:pag/:text', institutocontroller.listaqueryfiltro);
Rutas.get('/lista/:pag', institutocontroller.listaPag);
Rutas.get('/lista/:pag/:text', institutocontroller.listaPag);
Rutas.get('/filtrar/:campo/:valor', institutocontroller.filtrar);
Rutas.post('/nuevo', institutocontroller.nuevo);
Rutas.delete('/eliminar/:cue', institutocontroller.eliminar);
Rutas.put('/actualizar/:cue', institutocontroller.actualizar);

module.exports = Rutas;