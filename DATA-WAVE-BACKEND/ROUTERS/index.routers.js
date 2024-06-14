const {ofertaxinstituto} = require('../MODELS');

module.exports = (app) => {

    const Auth = require('../MIDDLEWARES/Auth'); // Importa el módulo 'Auth'

    // Importa las rutas:
    const institutoRouters = require('./instituto.routers');
    const sucursalRouters = require('./sucursal.routers');
    const tipoinstitutoRouters = require('./tipoinstituto.routers');
    const rolRouters = require('./rol.routers');
    const ciudadRouters = require('./ciudad.routers');
    const departamentoRouters = require('./departamento.routers');
    const permisoRouters = require('./permiso.routers');
    const ofertaRouters = require('./oferta.routers');
    const usuarioRouters = require('./usuario.routers');
    const cohorteRouters = require('./cohorte.routers');
    const ofertaxinstitutoRouters = require('./ofertaxinstituto.routers');

    // Usa las rutas:
    app.use('/instituto', institutoRouters);
    app.use('/sucursal', sucursalRouters);
    app.use('/tipoinstituto', tipoinstitutoRouters);
    app.use('/rol', rolRouters);
    app.use('/ciudad', ciudadRouters);
    app.use('/departamento', departamentoRouters);
    app.use('/permiso', permisoRouters);
    app.use('/oferta', ofertaRouters);
    app.use('/usuario', usuarioRouters);
    app.use('/cohorte', cohorteRouters);
    app.use('/ofertaxinstituto', ofertaxinstitutoRouters);

}