const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const blogSchema = mongoose.Schema({
    blogImage: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    blogDate: {
        type: String
    },
    category: {
        type: String
    },
    loginAdmin: {
        type: String
    },
    author: String
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/blogs"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

blogSchema.statics.uploadImage = multer({ storage: storage }).single('blogImage');

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;