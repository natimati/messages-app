const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { sendNewMessage, getAllMessagesSentToUser } = require('../controllers/messages');

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

router.post('/', [
    check('senderId', 'Recipient is required').isString(),
    check('recipientId', 'Recipient is required').isString(),
    check('title', 'Title is required').isString(),
    check('messageBody', 'Message is required').isString(),
    validateInput
], sendNewMessage);

router.get('/:recipientId', getAllMessagesSentToUser)

module.exports = router;