const express = require('express');
const bookRoutes = express.Router();
const book = require('../model/bookModel');
const passport = require('passport');
const { addBookPage, addBook, viewBook, deleteBook, editBook, updateBook } = require('../controller/bookController')

bookRoutes.get('/addBookPage', addBookPage);

bookRoutes.post('/addBook', book.uploadImage, addBook);

bookRoutes.get('/viewBook', viewBook);

bookRoutes.get('/deleteBook/:id', deleteBook);

bookRoutes.get('/editBook/:id', editBook);

bookRoutes.post('/updateBook/:id', book.uploadImage, updateBook)

module.exports = bookRoutes;        