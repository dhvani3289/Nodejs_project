const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/blogify-api")
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = dbConnect();