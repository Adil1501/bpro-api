const express = require('express');
const sequelize = require('./config/database');
const serviceRoutes = require('./routes/serviceRoutes');
require('dotenv').config();

const Service = require('./models/service');
const Quote = require('./models/quote');
const quoteRoutes = require('./routes/quoteRoutes');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="nl">
        <head>
            <meta charset="UTF-8">
            <title>B-Pro API Documentatie</title>
            <style>body { font-family: sans-serif; padding: 20px; line-height: 1.6; } code { background: #f4f4f4; padding: 2px 5px; border-radius: 4px; }</style>
        </head>
        <body>
            <h1>B-Pro Services API</h1>
            <p>Welkom bij de API voor B-Pro Services. Hieronder vind je de beschikbare endpoints.</p>
            
            <h2>1. Services (Diensten)</h2>
            <ul>
                <li><strong>GET</strong> <code>/api/services</code> - Alle diensten ophalen (Opties: ?page=1, ?limit=10, ?search=term, ?sortBy=price)</li>
                <li><strong>GET</strong> <code>/api/services/:id</code> - Details van één dienst</li>
                <li><strong>POST</strong> <code>/api/services</code> - Nieuwe dienst aanmaken</li>
                <li><strong>PUT</strong> <code>/api/services/:id</code> - Dienst updaten</li>
                <li><strong>DELETE</strong> <code>/api/services/:id</code> - Dienst verwijderen</li>
            </ul>

            <h2>2. Quotes (Offertes)</h2>
            <ul>
                <li><strong>POST</strong> <code>/api/quotes</code> - Offerte aanvragen (vereist geldig ServiceId)</li>
                <li><strong>GET</strong> <code>/api/quotes</code> - Alle offertes inzien (inclusief dienst details)</li>
                <li><strong>DELETE</strong> <code>/api/quotes/:id</code> - Offerte verwijderen</li>
            </ul>
        </body>
        </html>
    `);
});
app.use('/api/services', serviceRoutes);
app.use('/api/quotes', quoteRoutes);

Service.hasMany(Quote, { onDelete: 'CASCADE' }); 
Quote.belongsTo(Service);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database verbinding succesvol tot stand gebracht.');

        await sequelize.sync({ alter: true });
        console.log('✅ Alle modellen zijn gesynchroniseerd.');

        app.listen(PORT, () => {
            console.log(`🚀 Server draait op http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Kon geen verbinding maken met de database:', error);
    }
};

startServer();