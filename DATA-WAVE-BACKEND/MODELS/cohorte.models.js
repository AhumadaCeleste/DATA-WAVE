const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const cohorte= sequelize.define('cohorte', 
    {
        desde: {
            type: DataTypes.INTEGER,
            
            allowNull: false,
        },
        hasta: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false, 
        freezeTableName: true, 
    })
    return cohorte;
}