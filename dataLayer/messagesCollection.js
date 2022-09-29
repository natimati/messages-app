const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');

const Message = sequelize.define('Message', {
    senderId: DataTypes.STRING,
    recipientId: DataTypes.STRING,
    id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    title: DataTypes.STRING,
    messageBody: DataTypes.STRING,
});


module.exports = Message;