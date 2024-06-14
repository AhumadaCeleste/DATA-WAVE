const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const tipoapertura = sequelize.define("tipoapertura", 
    {
        // id automatico, no se completa
        descripcion: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
  
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    })
    return tipoapertura;
}