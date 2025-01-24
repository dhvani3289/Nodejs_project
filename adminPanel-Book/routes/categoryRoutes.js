const express = require('express');
const categoryRoutes = express.Router();
const category = require('../model/categoryModel');

const { addCategory, addCategoryPage, viewCategory, deleteCategory, editCategory, updateCategory } = require('../controller/categoryController');

categoryRoutes.get('/addCategory', addCategoryPage);

categoryRoutes.post('/addCategory', category.uploadImage, addCategory);

categoryRoutes.get('/viewCategory', viewCategory);

categoryRoutes.get('/deleteCategory/:id', deleteCategory);

categoryRoutes.get('/editCategory/:id', editCategory);

categoryRoutes.post('/updateCategory/:id', category.uploadImage, updateCategory)

module.exports = categoryRoutes;