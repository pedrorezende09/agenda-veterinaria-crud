const { Op } = require('sequelize');
const ConsultaVet = require('../models/models_consultaVet');
const Pet = require('../models/models_pet');


exports.criarConsulta = async (req, res) => {
    try {
        const novaConsulta = await ConsultaVet.create(req.body);
        return res.status(201).json(novaConsulta);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar consulta.', message: error.message });
    }
};


exports.listarConsultas = async (req, res) => {
    try {
        const consultas = await ConsultaVet.findAll({
            include: [{ model: Pet, attributes: ['nome', 'especie', 'dono'] }]
        });
        return res.status(200).json(consultas);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao listar consultas.', message: error.message });
    }
};

exports.buscarConsultas = async (req, res) => {
    try {
        const { veterinario } = req.query;
        if (!veterinario) return res.status(400).json({ error: 'Parâmetro veterinario obrigatório.' });

        const consultas = await ConsultaVet.findAll({
            where: { veterinario: { [Op.like]: `%${veterinario}%` } },
            include: [{ model: Pet, attributes: ['nome', 'especie', 'dono'] }]
        });

        if (consultas.length === 0) return res.status(404).json({ message: 'Nenhuma consulta encontrada.' });
        return res.status(200).json(consultas);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar consultas.', message: error.message });
    }
};

exports.atualizarConsulta = async (req, res) => {
    try {
        const [updated] = await ConsultaVet.update(req.body, { where: { id_consulta: req.params.id_consulta } });
        if (!updated) return res.status(404).json({ error: 'Consulta não encontrada.' });

        const consultaAtualizada = await ConsultaVet.findByPk(req.params.id_consulta);
        return res.status(200).json({ message: 'Consulta atualizada com sucesso!', consulta: consultaAtualizada });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar consulta.', message: error.message });
    }
};


exports.deletarConsulta = async (req, res) => {
    try {
        const deleted = await ConsultaVet.destroy({ where: { id_consulta: req.params.id_consulta } });
        if (!deleted) return res.status(404).json({ error: 'Consulta não encontrada.' });
        return res.status(200).json({ message: 'Consulta deletada com sucesso!' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar consulta.', message: error.message });
    }
};

exports.buscarConsultaPorNome = async (req, res) => {
    const { nome } = req.query;
    try {
        const consultas = await ConsultaVet.findAll({
            include: [{ model: Pet }],
            where: nome ? { '$Pet.nome$': { [Op.like]: `%${nome}%` } } : undefined
        });
        res.json(consultas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar consultas' });
    }
};
