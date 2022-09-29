const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');
const Message = require('./messagesCollection');

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  }
});

User.hasMany(Message, {
  foreignKey: 'senderId',
  targetKey: 'id',
  as: 'sender'
});

Message.belongsTo(User, {
  foreignKey: 'senderId',
  sourceKey: 'id',
  as: 'sender'
});

module.exports = User;