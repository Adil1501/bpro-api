const Service = require('../models/service');
const { Op } = require('sequelize');
exports.createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            message: 'Dienst succesvol aangemaakt',
            data: service
        });
    } catch (error) {
        res.status(400).json({
            message: 'Fout bij aanmaken dienst',
            error: error.message
        });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category, sortBy, order } = req.query;

        const offset = (page - 1) * limit;

        let whereClause = {};

        if (search) {
            whereClause.title = { [Op.like]: `%${search}%` };
        }
        if (category) {
            whereClause.category = category;
        }

        let orderClause = [['createdAt', 'DESC']];
        
        if (sortBy) {
            orderClause = [[sortBy, order ? order.toUpperCase() : 'ASC']]; 
        }

        const { count, rows } = await Service.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: orderClause
        });

        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: rows
        });

    } catch (error) {
        res.status(500).json({
            message: 'Er ging iets mis bij het ophalen',
            error: error.message
        });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(404).json({ message: 'Dienst niet gevonden' });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Fout bij ophalen', error: error.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(404).json({ message: 'Dienst niet gevonden' });
        }

        await service.update(req.body);

        res.status(200).json({
            message: 'Dienst succesvol geüpdatet',
            data: service
        });
    } catch (error) {
        res.status(400).json({ message: 'Fout bij updaten', error: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(404).json({ message: 'Dienst niet gevonden' });
        }

        await service.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Fout bij verwijderen', error: error.message });
    }
};