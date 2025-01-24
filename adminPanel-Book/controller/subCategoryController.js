const subCategory = require('../model/subCategoryModel');
const category = require('../model/categoryModel');

exports.addSubCategoryPage = async (req, res) => {
    let categories = await category.find();
    return res.render('subCategory/addSubCategory', { categories });
};

exports.addSubCategory = async (req, res) => {
    console.log(req.body);
    try {
        let newSubCategory = await subCategory.create(req.body);
        if (newSubCategory) {
            return res.redirect('/index/subcategory/viewSubCategory');
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

exports.viewSubCategory = async (req, res) => {
    try {
        let allSubCategories = await subCategory.find().populate('categoryId');
        return res.render('subCategory/viewSubCategory', { allSubCategories })
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {
        let deleteSubCategory = await subCategory.findById(req.params.id);
        if (deleteSubCategory) {
            await subCategory.findByIdAndDelete(req.params.id);
            return res.redirect('/index/subcategory/viewSubCategory');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

exports.editSubCategory = async (req, res) => {
    try {
        let subCategories = await subCategory.findById(req.params.id);
        let categories = await category.find();
        return res.render('subCategory/editSubCategory', { subCategories, categories })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.updateSubCategory = async (req, res) => {
    try {
        let updatedSubCategory = await subCategory.findById(req.params.id);
        if (updatedSubCategory) {
            await subCategory.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('/subcategory/viewSubCategory');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}