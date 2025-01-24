const book = require('../model/bookModel');
const category = require('../model/categoryModel');
const subCategory = require('../model/subCategoryModel');
const path = require('path');
const fs = require('fs');

// ADD BOOK PAGE
exports.addBookPage = async (req, res) => {
    let categories = await category.find();
    let subCategories = await subCategory.find();
    return res.render('book/addBook', { categories, subCategories });
};

// ADD BOOK
exports.addBook = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/books/${req.file.filename}`
        }
        req.body.bookImage = imagePath;

        let newBook = await book.create(req.body);
        if (newBook) {
            console.log("new book added", newBook);
            return res.redirect('/index/book/viewBook');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// VIEW BOOK
exports.viewBook = async (req, res) => {
    try {
        let allbooks = await book.find().populate('categoryId').populate('subCategoryId');
        if (allbooks) {
            return res.render('book/viewBook', { allbooks });
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
};

//DELETE BOOK
exports.deleteBook = async (req, res) => {
    try {
        let deleteBook = await book.findById(req.params.id);
        console.log("delete book", deleteBook);
        if (deleteBook) {
            if (deleteBook.bookImage) {
                let imagePath = path.join(__dirname, "..", deleteBook.bookImage);
                fs.unlinkSync(imagePath);
            }
            await book.findByIdAndDelete(req.params.id);
            return res.redirect('/index/book/viewBook');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
};

// EDIT BOOK
exports.editBook = async (req, res) => {
    try {
        let categories = await category.find();
        let subCategories = await subCategory.find();
        let editBook = await book.findById(req.params.id)
        return res.render('book/editbook', { editBook, categories, subCategories });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
};

// UPDATE BOOK
exports.updateBook = async (req, res) => {
    try {
        let updateBook = await book.findById(req.params.id);
        console.log(req.file);
        if (updateBook) {
            if (req.file) { // 
                let imagePath = updateBook.bookImage;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        fs.unlinkSync(imagePath);  //delete the old image
                    } catch (error) {
                        console.log(error);
                    }
                }
                req.body.bookImage = `/uploads/books/${req.file.filename}`
            }
            else {
                req.body.bookImage = updateBook.bookImage;
            }
            await book.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.redirect("/index/book/viewBook");
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}