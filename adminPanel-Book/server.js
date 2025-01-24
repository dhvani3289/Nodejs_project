const express = require('express');
const port = 7777;
const server = express();
const path = require('path');
const dbConnect = require('./config/dbConnections');
const passport = require('passport');
const passportLocalStrategy = require('./config/passportLocalStrategy');
const session = require('express-session');

server.set('view engine', 'ejs');
server.set("views", path.join(__dirname, "views"));

server.use(express.urlencoded());

server.use("/assets", express.static(path.join(__dirname, 'assets')));
server.use("/uploads", express.static(path.join(__dirname, 'uploads')));

server.use(session({
    name: 'admin',
    secret: 'admin',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(passport.setLocalUser);

server.use('/', require('./routes/userRoutes'));
server.use('/auth', require('./routes/authRoutes'));
server.use('/index', require('./routes/indexRoutes'));

server.listen(port, (err) => {
    if (err) {
        console.log('Server not start');
    } else {
        console.log(`Server start at http://localhost:${port}`);
    }
});

