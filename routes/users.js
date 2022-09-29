const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { username, loginWithUsername, getUsers } = require('../controllers/users');

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

router.post('/', [
    check('username', 'Username is required').isString(),
    validateInput
], loginWithUsername);

router.get('/', getUsers);

module.exports = router;