const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'  // this ref name is defined in categoryModel.js
    },
    subCategoryName: String
});

module.exports = mongoose.model('subCategory', subCategorySchema);