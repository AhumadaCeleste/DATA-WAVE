const Rutas = require('express').Router();
exports.Rutas = Rutas;
const usuarioController = require('../CONTROLLERS/usuario.contollers');

// Ruta para obtener los permisos de un usuario por su ID
Rutas.get('/filtrar/:valor', usuarioController.filtrar);

// Ruta para obtener la lista de usuarios
Rutas.get('/lista', usuarioController.lista);

Rutas.get('/listafull', usuarioController.listafull);

Rutas.get('/listafull2', usuarioController.listafull2);

Rutas.post('/nuevo', usuarioController.nuevo);

Rutas.post('/login', usuarioController.login);

module.exports = Rutas;