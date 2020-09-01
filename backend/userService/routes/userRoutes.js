const express = require('express');
const users = express.Router();

const userController = require('../controllers/userController');

users.post('/register', userController.registerUser);
users.post('/login', userController.login);
users.get('/:id', userController.getUserById);

module.exports = users;
