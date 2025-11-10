const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');
const Pet = require('./models_pet');

const ConsultaVet = sequelize.define('ConsultaVet', {
    id_consulta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_pet: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: Pet, key: 'id_pet' }
    },
    veterinario: { type: DataTypes.STRING(255), allowNull: false },
    data: { type: DataTypes.DATEONLY, allowNull: false },
    hora: { type: DataTypes.STRING(10), allowNull: false }, 
    motivo: { type: DataTypes.STRING(255), allowNull: false },
    status: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'Agendada' }
}, {
    tableName: 'ConsultaVet',
    timestamps: false
});

// Relações
ConsultaVet.belongsTo(Pet, { foreignKey: 'id_pet' });
Pet.hasMany(ConsultaVet, { foreignKey: 'id_pet' });

module.exports = ConsultaVet;