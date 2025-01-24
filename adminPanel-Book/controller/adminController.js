const admin = require('../model/adminModel');
const path = require('path');
const fs = require('fs');

exports.addAdminPage = async (req, res) => {
    return res.render('admin/addAdmin')
};

exports.addAdmin = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/admins/${req.file.filename}`
        }
        req.body.adminImage = imagePath;

        let newAdmin = await admin.create(req.body);

        if (newAdmin) {
            console.log("New Admin Added...");
            return res.redirect("/index/admin/viewAdmin")
        } else {
            console.log("Somthing Wrong...");
            return res.redirect("back")
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

exports.editAdmin = async (req, res) => {
    try {
        let editAdmin = await admin.findById(req.params.id);
        if (editAdmin) {
            return res.render('admin/editAdmin', { editAdmin })
        }
        else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        let record = await admin.findById(req.params.id);
        console.log(record);
        if (record) {
            if (req.file) {
                let imagePath = record.adminImage;
                if (imagePath != "" && imagePath) {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        fs.unlinkSync(imagePath);
                    } catch (error) {
                        console.log("File Missing....");
                    }
                }
                req.body.adminImage = `/uploads/admins/${req.file.filename}`;
            } else {
                req.body.adminImage = record.adminImage
            }
            await admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.redirect("/index/admin/viewAdmin")
        } else {
            console.log("Record not Found...");
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        let deleteAdmin = await admin.findById(req.params.id);
        if (deleteAdmin) {
            if (deleteAdmin.adminImage) {
                let imagePath = path.join(__dirname, "..", deleteAdmin.adminImage);
                fs.unlinkSync(imagePath);
            }
            await admin.findByIdAndDelete(req.params.id);
            return res.redirect('/index/admin/viewAdmin');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

exports.viewAdmin = async (req, res) => {
    let allAdmin = await admin.find();
    return res.render('admin/viewAdmin', { allAdmin })
}





