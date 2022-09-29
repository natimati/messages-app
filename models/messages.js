const messageCollection = require('../dataLayer/messagesCollection');
const User = require('../dataLayer/usersCollections');

async function createMessage(body) {
    const message = await messageCollection.create({
        senderId: body.senderId,
        recipientId: body.recipientId,
        title: body.title,
        messageBody: body.messageBody
    })
    return message;
};

async function getMessages(recipientId) {
    const messages = await messageCollection.findAll({ where: { recipientId }, include: { model: User, as: 'sender' } });
    return messages; 
};

module.exports = { createMessage, getMessages };