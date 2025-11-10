const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { Op } = require('sequelize');


router.get('/pets/buscar', async (req, res) => { });

router.post('/pets', petController.cadastrarPet);

router.post('/pets', petController.cadastrarPet);
router.get('/pets', petController.listarPets);


router.put('/pets/:id', petController.atualizarPet); 
router.get('/pets/:id', petController.detalharPet); 
router.delete('/pets/:id', petController.deletarPet);


router.get('/pets/id/:id', petController.buscarPetPorId); 

module.exports = router;