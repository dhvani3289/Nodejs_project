const express = require('express');
const authRoutes = express.Router();
const admin = require('../model/adminModel');
const blog = require('../model/blogModel');
const { signUpPage, signInPage, signUp, signIn, logout, home } = require('../controller/authController');
const passport = require('passport');

// ------------LOGIN PAGE-------------
authRoutes.get('/', signInPage);

// ------------LOGIN POST-------------
// The 'local' strategy means it will check the username and password using a custom logic defined in the application.
// If the authentication fails, the user is redirected to '/'(login page).
authRoutes.post('/', passport.authenticate('local', { failureRedirect: '/' }), signIn);

// ------------SIGN UP PAGE-------------
authRoutes.get('/register', signUpPage);

// ------------SIGN UP POST-------------
authRoutes.post('/register', admin.uploadImage, signUp);

// ------------HOME PAGE-------------
authRoutes.get('/home', passport.validateUser, home);

// ------------LOGOUT-------------
authRoutes.get('/logout', logout);

// authRoutes.get('/logout', logout);
// authRoutes.post('/logout', logout);



module.exports = authRoutes;