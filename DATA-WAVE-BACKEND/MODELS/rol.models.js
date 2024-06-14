const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
    // nombre de tabla en BD
    const rol = sequelize.define("rol", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
            },
        nombre:{
            type: DataTypes.STRING(45),
            allowNull: false,
            },
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    }
)
    return rol;
}