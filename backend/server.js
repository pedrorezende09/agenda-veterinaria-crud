const express = require('express');
const { connectDB } = require('./config/sequelize');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



const petRoutes = require('./routes/petRoutes');
const consultaRoutes = require('./routes/consultaRoutes');


app.use('/api', petRoutes);
app.use('/api', consultaRoutes);



app.get('/', (req, res) => res.send('API Agenda Vet funcionando ✅'));


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
});
