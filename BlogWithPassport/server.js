const express = require('express');
const port = 8575;
const server = express();
const path = require('path');
const dbConnect = require('./config/dbConnection');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
let passport = require("passport");
let session = require("express-session");
let passportLocalStrategy = require('./config/passportLocalStratergy');
const flash = require("connect-flash"); // flash popup message
const flashConnect = require('./config/flashConnect'); // flash popup message

server.set('view engine', 'ejs');
server.use(express.urlencoded());
server.use(cookieParser());
server.use(flash());
server.set("views", path.join(__dirname, "views"));
server.use("/uploads", express.static(path.join(__dirname, 'uploads')));

server.use(session({
    name: 'learning',
    secret: 'learning',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(passport.setLocalUser);
server.use(flashConnect.setFlash);

server.use("/", require("./routes/authRoutes"));
server.use("/admin", require("./routes/blogRoutes"));

server.listen(port, (err) => {
    if (err) {
        console.log('Server not start');
    } else {
        console.log(`Server start at http://localhost:${port}`);
    }
});


