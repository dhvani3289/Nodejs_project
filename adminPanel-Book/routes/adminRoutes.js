const express = require('express');
const { addAdminPage, addAdmin, viewAdmin, deleteAdmin, editAdmin, updateAdmin } = require('../controller/adminController');
const adminRoutes = express.Router();
const admin = require('../model/adminModel');

// add admin page
adminRoutes.get('/addAdmin', addAdminPage);

// add admin
adminRoutes.post('/addAdmin', admin.uploadImage, addAdmin);

// edit admin
adminRoutes.get('/editAdmin/:id', editAdmin);

// update admin
adminRoutes.post('/updateAdmin/:id', admin.uploadImage, updateAdmin);

// delete admin
adminRoutes.get('/deleteAdmin/:id', deleteAdmin);

// view admin
adminRoutes.get('/viewAdmin', viewAdmin);


module.exports = adminRoutes;