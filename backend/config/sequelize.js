const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('AGENDA_VET', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Banco conectado com sucesso!');
        await sequelize.sync({ alter: true }); 
        console.log('✅ Tabelas sincronizadas!');
    } catch (error) {
        console.error('❌ Erro ao conectar:', error);
    }
};

module.exports = { sequelize, connectDB };
