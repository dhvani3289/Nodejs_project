const express = require('express');
const { addBlogPage, addBlog, deleteBlog, editBlog, updateBlog } = require('../controller/blogController');
const blogRoutes = express.Router();
const blog = require('../model/blogModel');
const passport = require('passport');

// ADD BLOG PAGE
blogRoutes.get('/addBlog', passport.validateUser, addBlogPage);

// ADD BLOG
blogRoutes.post('/addBlog', blog.uploadImage, addBlog);

// DELETE BLOG
blogRoutes.get('/deleteBlog/:id', deleteBlog);

// EDIT BLOG PAGE
blogRoutes.get('/editBlog/:id', editBlog);

// UPDATE BLOG
blogRoutes.post('/updateBlog/:id', blog.uploadImage, updateBlog);

module.exports = blogRoutes;

