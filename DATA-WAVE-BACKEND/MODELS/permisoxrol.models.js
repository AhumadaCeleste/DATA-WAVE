const { DataTypes } = require ('sequelize');
const Permiso = require('./permiso.models'); // Importa el modelo Permiso
const Rol = require('./rol.models');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const permisoxrol = sequelize.define("permisoxrol", 
    {
        idpermiso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
              model: Permiso,
              key: 'id'
                    }
            },
         idrol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
              model: Rol,
              key: 'id'
                }
            }
      
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    })
    return permisoxrol;
}