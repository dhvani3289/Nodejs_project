const book = require('../model/bookModel');

exports.home = async (req, res) => {
    let allBooks = await book.find().populate('categoryId').populate('subCategoryId');
    return res.render('home', { allBooks })
}

