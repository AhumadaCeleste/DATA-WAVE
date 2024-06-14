const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ciudad = sequelize.define('Ciudad', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        }        
    },
    {
        timestamps: false, // sacar datetime
        freezeTableName: true, // no pluraliza el nombre de la tabla
    }
);

    return Ciudad;
};