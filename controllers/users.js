const { response } = require('express');
const { getUserByUsername, createUser, getAll } = require('../models/users');


const loginWithUsername = async (req, res = response) => {
    const { username } = req.body;

    try {
        let user = await getUserByUsername(username);
        if (!user) {
            user = await createUser(username)
        }
        return res.status(200).json({ username: username, id: user.id })
    } catch {
        return res.status(500).json({
            message: "Something going wrong"
        })
    }
};

const getUsers = async (req, res = response) => {
    const users = await getAll();
    try {
        res.json(users)
    }
    catch (e) {
        console.error(e);
        res.status(500).send();
    }
};

module.exports = { getUsers, loginWithUsername }
