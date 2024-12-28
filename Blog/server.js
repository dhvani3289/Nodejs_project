const express = require('express');
const port = 5498;
const server = express();
const path = require('path');
const dbConnect = require('./config/dbConnection');
const cookieParser = require('cookie-parser');

server.set('view engine', 'ejs');
server.use(express.urlencoded());
server.use(cookieParser());

server.use("/uploads", express.static(path.join(__dirname, 'uploads')));

server.use("/", require("./routes/authRoutes"));
// server.use("/home", require("./routes/blogRoutes"));
server.use("/admin", require("./routes/blogRoutes"));

server.listen(port, (err) => {
    if (err) {
        console.log('Server not start');
    } else {
        console.log(`Server start at http://localhost:${port}`);
    }
});


