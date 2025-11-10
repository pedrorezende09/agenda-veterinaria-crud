const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Pet = sequelize.define('Pet', {
    id_pet: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    especie: { type: DataTypes.STRING, allowNull: false },
    raca: { type: DataTypes.STRING, allowNull: false },
    idade: { type: DataTypes.INTEGER, allowNull: false },
    dono: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'Pet',
    timestamps: false
});

module.exports = Pet;
