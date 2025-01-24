const express = require('express');
const { home } = require('../controller/userController');
const userRoutes = express.Router();

userRoutes.get('/', home);

module.exports = userRoutes;