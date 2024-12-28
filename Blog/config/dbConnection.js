const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/blogs")
        .then(() => {
            console.log("Database is Connected");
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = dbConnect();