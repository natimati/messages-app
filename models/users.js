const usersCollection = require('../dataLayer/usersCollections');

async function createUser(username) {
    const user = await usersCollection.create({
        username: username
    })
    return user
};

async function getUserByUsername(username) {
    const user = await usersCollection.findOne({ where: { username }})
    return user
};

async function getAll() {
    const users = await usersCollection.findAll();
    return users;
};

module.exports = { createUser, getAll, getUserByUsername };