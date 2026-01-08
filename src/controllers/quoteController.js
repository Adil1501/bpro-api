const Quote = require('../models/quote');
const Service = require('../models/service');

exports.createQuote = async (req, res) => {
    try {
        const quote = await Quote.create(req.body);
        
        res.status(201).json({
            message: 'Offerte aanvraag ontvangen',
            data: quote
        });
    } catch (error) {
        res.status(400).json({
            message: 'Fout bij aanmaken offerte',
            error: error.message
        });
    }
};

exports.getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.findAll({
            include: Service
        });

        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

exports.deleteQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await Quote.findByPk(id);
        
        if(!quote) return res.status(404).json({message: "Niet gevonden"});

        await quote.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};