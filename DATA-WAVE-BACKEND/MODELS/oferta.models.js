const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    const oferta = sequelize.define('oferta',
    {
        // id automatico, no se completa, total, cantidad, fecha, precio total, descuentos, carritoxProducto, etc
        resolucion:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        nombre:{
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        
        sector:{
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        descripcion:{
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        
    },
    {
        timestamps: false, 
        freezeTableName: true, 
    }
  
    );
    return oferta;
}