const express = require('express');
const subCategoryRoutes = express.Router();
const { addSubCategoryPage, addSubCategory, viewSubCategory, deleteSubCategory, editSubCategory, updateSubCategory } = require('../controller/subCategoryController');

// add category page
subCategoryRoutes.get('/addSubCategory', addSubCategoryPage);

// add category
subCategoryRoutes.post('/addSubCategory', addSubCategory);

// view catgeory
subCategoryRoutes.get('/viewSubCategory', viewSubCategory);

// delete category
subCategoryRoutes.get('/deleteSubCategory/:id', deleteSubCategory);

// edit subcategory
subCategoryRoutes.get('/editSubCategory/:id', editSubCategory);

// update subcategory
subCategoryRoutes.post('/updateSubCategory/:id', updateSubCategory);

module.exports = subCategoryRoutes;