const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb+srv://dhvani:Dhvani123@cluster0.pvxyl.mongodb.net/blogify-api")
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = dbConnect();