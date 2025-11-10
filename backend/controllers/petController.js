const Pet = require('../models/models_pet');


exports.cadastrarPet = async (req, res) => {
    try {
        const { nome, especie, raca, idade, dono } = req.body;
        if (!nome || !especie || !raca || !idade || !dono) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }
         const novoPet = await Pet.create({ nome, especie, raca, idade, dono });
       return res.status(201).json(novoPet);
    } catch (error) {
        console.error("Erro ao cadastrar pet:", error);
        return res.status(500).json({ message: "Erro interno ao cadastrar pet.", error: error.message });
    }
};


exports.listarPets = async (req, res) => {
    try {
        const pets = await Pet.findAll();
        return res.status(200).json(pets);
    } catch (error) {
        console.error("Erro ao listar pets:", error);
        return res.status(500).json({ message: "Erro interno ao listar pets.", error: error.message });
    }
};


exports.detalharPet = async (req, res) => {
    try {
        // Usa req.params.id (Rota /pets/:id)
        const pet = await Pet.findByPk(req.params.id); 
        if (!pet) return res.status(404).json({ message: "Pet não encontrado." });
        return res.status(200).json(pet);
    } catch (error) {
        console.error("Erro ao detalhar pet:", error);
        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};


exports.atualizarPet = async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) return res.status(404).json({ message: "Pet não encontrado para atualização." });
        await pet.update(req.body);
        return res.status(200).json({ message: "Pet atualizado com sucesso!", pet });
    } catch (error) {
        console.error("Erro ao atualizar pet:", error);
        return res.status(500).json({ message: "Erro interno ao atualizar pet.", error: error.message });
    }
};


exports.deletarPet = async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) return res.status(404).json({ message: "Pet não encontrado para exclusão." });
        await pet.destroy();
        return res.status(200).json({ message: "Pet deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar pet:", error);
        return res.status(500).json({ message: "Erro interno ao deletar pet.", error: error.message });
    }
};


exports.buscarPetPorId = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    

    console.log("=========================================");
    console.log(`[BACKEND] Buscando pet com ID: ${id}`); 


    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    try {
        const pet = await Pet.findByPk(id);


        console.log("[BACKEND] Resultado da busca:", pet);
        console.log("=========================================");


        if (!pet) return res.status(404).json({ message: "Pet não encontrado" });
        res.json(pet);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar pet' });
    }
};


exports.Pet = Pet;