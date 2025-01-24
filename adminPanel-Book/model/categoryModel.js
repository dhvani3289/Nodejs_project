const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const categorySchema = mongoose.Schema({
    categoryImage: String,
    categoryName: String
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "/uploads/category"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

categorySchema.statics.uploadImage = multer({ storage }).single('categoryImage');
const category = mongoose.model('category', categorySchema);
module.exports = category;