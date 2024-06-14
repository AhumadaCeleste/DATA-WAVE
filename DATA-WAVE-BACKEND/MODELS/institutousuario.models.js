const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const institutousuario = sequelize.define('institutousuario', {
        // No se definen columnas
    }, {
        timestamps: false, 
        freezeTableName: true, 
    },
  );

    return institutousuario;
};