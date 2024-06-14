const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const dbConfig = require('../CONFIG/db.config');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.port,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define los modelos
db.ciudad = require('./ciudad.models')(sequelize);
db.cohorte = require('./cohorte.models')(sequelize);
db.departamento = require('./departamento.model')(sequelize);
db.instituto = require('./instituto.models')(sequelize);
db.oferta = require('./oferta.models')(sequelize);
db.ofertaxinstituto = require('./ofertaxinstituto.models')(sequelize);
db.permiso = require('./permiso.models')(sequelize);
db.permisoxrol = require('./permisoxrol.models')(sequelize);
db.rol = require('./rol.models')(sequelize);
db.tipoapertura = require('./tipoapertura.models')(sequelize);
db.usuario = require('./usuario.models')(sequelize);
db.egresado = require('./egresado.models')(sequelize);
db.institutousuario = require('./institutousuario.models')(sequelize);
db.tipoinstituto = require('./tipoinstituto.models')(sequelize);
db.sucursal = require('./sucursal.models')(sequelize);

// Relaciones
db.institutousuario.belongsTo(db.instituto);
db.institutousuario.belongsTo(db.usuario);
//---------------------------------------
db.instituto.belongsTo(db.tipoinstituto);
db.tipoinstituto.hasMany(db.instituto);

db.instituto.belongsTo(db.ciudad);
db.ciudad.hasMany(db.instituto);

db.instituto.belongsTo(db.sucursal);
db.sucursal.hasMany(db.instituto);
//--------------------------------------
db.ofertaxinstituto.belongsTo(db.instituto);
db.ofertaxinstituto.belongsTo(db.oferta);
//-----------------------------------
db.usuario.belongsTo(db.rol, { foreignKey: 'idrol'});
db.rol.belongsToMany(db.permiso, { through: db.permisoxrol, foreignKey: 'idrol'});
db.permiso.belongsToMany(db.rol, { through: db.permisoxrol, foreignKey: 'idpermiso'});
//--------------------------------------
db.ciudad.belongsTo(db.departamento);
db.departamento.hasMany(db.ciudad);
//--------------------------------------
db.oferta.belongsTo(db.cohorte);
//db.cohorte.belongsTo(db.oferta);
//--------------------------------------
db.cohorte.belongsTo(db.tipoapertura);
db.tipoapertura.hasMany(db.cohorte);
//--------------------------------------
db.egresado.belongsTo(db.instituto);
db.egresado.belongsTo(db.oferta);
//--------------------------------------

module.exports = db;