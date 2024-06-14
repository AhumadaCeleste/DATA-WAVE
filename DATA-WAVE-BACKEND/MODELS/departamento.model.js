const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    const departamento = sequelize.define('departamento', {
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    },
    {
        timestamps: false, 
        freezeTableName: true, 
    });

    return departamento;
};