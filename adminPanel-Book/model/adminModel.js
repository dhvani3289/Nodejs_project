const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const bookAdminPanelSchema = mongoose.Schema({
    adminImage: String,
    adminFirstname: String,
    adminLastname: String,
    email: String,
    password: String,
    confirm_password: String,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/admins"))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

bookAdminPanelSchema.statics.uploadImage = multer({ storage }).single('adminImage');
module.exports = mongoose.model('admin', bookAdminPanelSchema);

