const express = require('express');
const adminRoutes = express.Router();
const user = require('../model/user.model');
const blog = require('../model/blog.model');
const { verifyToken } = require('../middleware/verifyToken');
const { register, login, getProfile, updateAdmin, deleteAdmin, addBlog, getAllBlogs, getSingleBlog, updateBlog, viewAllComments, deleteBlog } = require('../controller/admin.controller');

//----------ADMIN AUTHENTICATION--------------

adminRoutes.post("/register", user.uploadImage, register);

adminRoutes.post("/login", login);

adminRoutes.get("/profile", verifyToken, getProfile);

adminRoutes.put('/updateAdmin/:id', verifyToken, user.uploadImage, updateAdmin);

adminRoutes.delete('/deleteAdmin/:id', verifyToken, deleteAdmin);

//----------BLOG----------- 
adminRoutes.post('/addBlog', verifyToken, blog.uploadImage, addBlog);

adminRoutes.get('/getAllBlogs', verifyToken, getAllBlogs);

adminRoutes.get('/getSingleBlog/:id', verifyToken, getSingleBlog);

adminRoutes.put('/updateBlog/:id', verifyToken, blog.uploadImage, updateBlog);

adminRoutes.delete('/deleteBlog/:id', verifyToken, deleteBlog);

adminRoutes.get('/viewAllComments', verifyToken, viewAllComments)


module.exports = adminRoutes;