const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const adminSchema = mongoose.Schema({
    adminImage: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    confirm_password: {
        type: String
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/admins"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

adminSchema.statics.uploadImage = multer({ storage: storage }).single('adminImage');

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;