const express = require('express');
const { addBlogPage, addBlog, deleteBlog, editBlog, updateBlog } = require('../controller/blogController');
const blogRoutes = express.Router();
const blog = require('../model/blogModel');

blogRoutes.get('/addBlog', addBlogPage);

blogRoutes.post('/addBlog', blog.uploadImage, addBlog);

blogRoutes.get('/deleteBlog/:id', deleteBlog);

blogRoutes.get('/editBlog/:id', editBlog);

blogRoutes.post('/updateBlog/:id', blog.uploadImage, updateBlog);

module.exports = blogRoutes;

