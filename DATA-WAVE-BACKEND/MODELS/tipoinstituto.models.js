const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const tipoinstituto = sequelize.define("tipoinstituto", {
        descripcion: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    {
        timestamps: false, 
        freezeTableName: true, 
    });

    return tipoinstituto;
};