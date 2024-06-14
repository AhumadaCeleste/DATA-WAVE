const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    const egresado = sequelize.define('egresado', {
  
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false, 
        freezeTableName: true, 
    });

    return egresado;
};