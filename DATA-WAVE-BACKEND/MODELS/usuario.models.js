const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
    const usuario = sequelize.define("usuario", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
            },
        dni: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
            },
        apellido: {
            type: DataTypes.STRING(30),
            allowNull: false,
            },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false,
            },
        idrol: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    }
)
    return usuario;
}