const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quote = sequelize.define('Quote', {
    clientName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Naam mag niet leeg zijn" }
        }
    },
    clientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: "Vul een geldig emailadres in" }
        }
    },
    jobDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isFuture(value) {
                if (new Date(value) <= new Date()) {
                    throw new Error('De datum van de klus moet in de toekomst liggen.');
                }
            }
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    }
}, {
    timestamps: true
});

module.exports = Quote;