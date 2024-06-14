const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const sucursal = sequelize.define("sucursal", {
        descripcion: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    {
        timestamps: false, 
        freezeTableName: true, 
    });

    return sucursal;
};