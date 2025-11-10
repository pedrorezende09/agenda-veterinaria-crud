const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');


router.post('/consultas', consultaController.criarConsulta);


router.get('/consultas', consultaController.listarConsultas);


router.get('/consultas/buscar', consultaController.buscarConsultas);


router.put('/consultas/:id_consulta', consultaController.atualizarConsulta);


router.delete('/consultas/:id_consulta', consultaController.deletarConsulta);

module.exports = router;
