const express = require('express');
const index = express.Router();
const passport = require('passport');

index.get('/', passport.validateUser, (req, res) => {
    return res.render('dashboard')
})
index.use('/admin', passport.validateUser, require('./adminRoutes'));
index.use('/category', passport.validateUser, require('./categoryRoutes'));
index.use('/subcategory', passport.validateUser, require('./subCategoryRoutes'));
index.use('/book', passport.validateUser, require('./bookRoutes'));

module.exports = index;