const express = require('express');
const authRoutes = express.Router();
const admin = require('../model/adminModel');
const blog = require('../model/blogModel');
const { signUpPage, signInPage, signUp, signIn, logout, home } = require('../controller/authController');

// ------------SIGN UP PAGE-------------
authRoutes.get('/', signUpPage);

// ------------SIGN IN PAGE-------------
authRoutes.get('/signIn', signInPage);

// ------------SIGN UP POST-------------
authRoutes.post('/', admin.uploadImage, signUp);

// ------------SIGN IN POST-------------
authRoutes.post('/signIn', signIn);

// ------------HOME PAGE-------------
authRoutes.get('/home', home);

// ------------LOGOUT-------------
authRoutes.get('/logout', logout);

module.exports = authRoutes;