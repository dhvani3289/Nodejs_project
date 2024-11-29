const express = require('express');
const port = 3000;
const server = express();
const path = require('path');

server.set('view engine', 'ejs');
server.use(express.urlencoded());

server.use(express.static(path.join(__dirname, "public", "dist")));

const chartValidate = (req, res, next) => {
    if (req.query.age >= 18) {
        next();
    } else {
        return res.redirect('/');
    }
}

const formValidate = (req, res, next) => {
    if (req.query.pass == 1234) {
        next();
    } else {
        return res.redirect('/');
    }
}

const carouselValidate = (req, res, next) => {
    if (req.query.email == "example@gmail.com") {
        next();
    } else {
        return res.redirect('/');
    }
}

server.get('/', (request, response) => {
    return response.render('index')
});

server.get('/chart', chartValidate, (request, response) => {
    return response.render('chart')
});

server.get('/form', formValidate, (request, response) => {
    return response.render('form')
});

server.get('/carousel', carouselValidate, (request, response) => {
    return response.render('carousel')
});

server.listen(port, (err) => {
    if (err) {
        console.log('Server not start');
    } else {
        console.log(`Server start at http://localhost:${port}`);
    }
});
