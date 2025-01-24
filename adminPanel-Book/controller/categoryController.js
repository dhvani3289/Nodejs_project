const category = require('../model/categoryModel');
const path = require('path');
const fs = require('fs');

exports.addCategoryPage = (req, res) => {
    return res.render('category/addCategory');
};

exports.addCategory = async (req, res) => {
    console.log(req.body);
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/category/${req.file.filename}`
        }
        req.body.categoryImage = imagePath

        let newCategory = await category.create(req.body);
        if (newCategory) {
            return res.redirect('/index/category/viewCategory');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
};

exports.viewCategory = async (req, res) => {
    try {
        let allCategory = await category.find();
        if (allCategory) {
            return res.render('category/viewCategory', { allCategory });
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        let deleteCategory = await category.findById(req.params.id);
        if (deleteCategory) {
            if (deleteCategory.categoryImage) {
                let imagePath = path.join(__dirname, "..", deleteCategory.categoryImage);
                fs.unlinkSync(imagePath);
            }
            await category.findByIdAndDelete(req.params.id);
            return res.redirect('/index/category/viewCategory');
        } else {
            return res.redirect('back');

        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.editCategory = async (req, res) => {
    try {
        return res.render('category/editCategory', { editCategory: await category.findById(req.params.id) });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let updatedCategory = await category.findById(req.params.id);
        console.log(req.file);
        if (updatedCategory) {
            if (req.file) { // 
                let imagePath = updatedCategory.categoryImage;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        fs.unlinkSync(imagePath);  //delete the old image
                    } catch (error) {
                        console.log(error);
                    }
                }
                req.body.categoryImage = `/uploads/category/${req.file.filename}`
            }
            else {
                req.body.categoryImage = updatedCategory.categoryImage;
            }
            await category.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.redirect("/index/category/viewCategory");
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
