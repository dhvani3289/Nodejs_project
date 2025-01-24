const express = require('express');
const authRoutes = express.Router();
const admin = require('../model/adminModel');
const book = require('../model/bookModel');
const { loginPage, login, registerPage, register, logout, home } = require('../controller/authController');
const passport = require('passport');

// ------------LOGIN PAGE-------------
authRoutes.get('/login', loginPage);

// ------------LOGIN POST-------------
authRoutes.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), login);

// ------------SIGN UP PAGE-------------
authRoutes.get('/register', registerPage);

// ------------SIGN UP POST-------------
authRoutes.post('/register', admin.uploadImage, register);

// ------------LOGOUT-------------
authRoutes.get('/logout', logout);

module.exports = authRoutes;