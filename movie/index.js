const express = require('express');
const port = 3478;
const app = express();
const dbConnect = require('./config/dbConnection');
const movie = require('./model/movieModel');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', async (req, res) => {
    let movieData = await movie.find();
    return res.render('index', { movieData });
});

app.get('/addMovie', (req, res) => {
    return res.render('addMovie');
});

app.post('/addMovie', movie.uploadImage, async (req, res) => {
    let imagePath = "";
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`
    }
    req.body.image = imagePath;

    let addMovie = await movie.create(req.body)

    if (addMovie) console.log('New Movie Added!!!!!');
    else console.log('Something Went Wrong');

    return res.redirect("/");
});

app.get('/deleteMovie/:id', async (req, res) => {
    let deleteMovie = await movie.findById(req.params.id)
    if (deleteMovie) {
        await movie.findByIdAndDelete(req.params.id);
        console.log("deleted");
        return res.redirect('/')
    } else {
        console.log("something went wrong");
        return res.redirect('/')
    }
});

app.get('/editMovie/:id', async (req, res) => {
    let editMovie = await movie.findById(req.params.id);
    if (editMovie) {
        return res.render('updateMovie', { movie: editMovie })
    } else {
        console.log('something went wrong');
        return res.redirect('/')
    }
});

app.post('/updateMovie/:id', movie.uploadImage, async (req, res) => {

    let updateMovie = await movie.findById(req.params.id);
    console.log(updateMovie);

    if (updateMovie) {
        await movie.findByIdAndUpdate(req.params.id, req.body);
        console.log('movie is updated');
        return res.redirect('/');
    } else {
        console.log('Something Went Wrong');
        return res.redirect('back');
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log('server not started');
    }
    else {
        console.log(`Server start at http://localhost:${port}`);
    }
}); 