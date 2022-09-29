const { response } = require('express');
const { getMessages, createMessage } = require('../models/messages');

const sendNewMessage = async (req, res = response) => {
    const { senderId, recipientId, title, messageBody } = req.body;
    try {
        await createMessage({
            senderId: senderId,
            recipientId: recipientId,
            title: title,
            messageBody: messageBody
        })
        res.status(201).json({message: "message send"})
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'internal server error' })
    }
};

const getAllMessagesSentToUser = async (req, res = response) => {
    const messages = await getMessages(req.params.recipientId);

    try {
        res.json(messages);
    }
    catch (e) {
        console.error(e);
        res.status(500).send();
    }
};

module.exports = { getAllMessagesSentToUser, sendNewMessage };