const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const movieSchema = mongoose.Schema({
    image: String,
    title: String,
    year: String,
    plot: String,
    genre: Array,
    language: String,
    director: String,
    rating: Number
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

movieSchema.statics.uploadImage = multer({ storage }).single('image');
module.exports = mongoose.model('movie', movieSchema);