const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb+srv://dhvani:Dhvani123@cluster0.pvxyl.mongodb.net/Adminpanel-book")
        .then(() => {
            console.log("Database is Connected");
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = dbConnect();   