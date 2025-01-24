const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const bookSchema = mongoose.Schema({
    bookImage: String,
    bookTitle: String,
    bookAuthor: String,
    bookLanguge: String,
    bookPages: Number,
    bookPrice: Number,
    bookYear: Number,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory'
    },
    bookStatus: String
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", 'uploads/books'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

bookSchema.statics.uploadImage = multer({ storage }).single('bookImage');
const book = mongoose.model('book', bookSchema);
module.exports = book;