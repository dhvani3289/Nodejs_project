const express = require('express');
const userRoutes = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const { register, login, profile, updateUser, deleteUser, getAllBlogs, getSingleBlog, addComment, deleteComment } = require('../controller/user.controller');

//----------USER AUTHENTICATION--------------
userRoutes.post("/register", register);

userRoutes.post("/login", login);

userRoutes.get("/profile", verifyToken, profile);

userRoutes.put('/updateUser/:id', verifyToken, updateUser);

userRoutes.delete('/deleteUser/:id', verifyToken, deleteUser);

// BLOG 
userRoutes.get('/getAllBlogs', getAllBlogs);

userRoutes.get('/getSingleBlog/:id', verifyToken, getSingleBlog);

userRoutes.post('/addComment/:id', verifyToken, addComment);

userRoutes.delete('/deleteComment/:id', verifyToken, deleteComment);

module.exports = userRoutes;
