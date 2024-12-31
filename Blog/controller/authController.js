const admin = require('../model/adminModel');
const blog = require('../model/blogModel');

exports.signUpPage = (req, res) => {
    return res.render('Auth/signUp');
}

exports.signInPage = (req, res) => {
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.render("Auth/signIn");
    } else {
        return res.render('home');
    }
}

exports.signUp = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/admins/${req.file.filename}`
        }
        req.body.adminImage = imagePath;

        let newAdmin = await admin.create(req.body);
        console.log(newAdmin);

        if (newAdmin) {
            if (newAdmin.password === newAdmin.confirm_password) {
                console.log("New Admin Added...");
                return res.redirect("/signIn");
            } else {
                console.log("Password is not mathced...");
                return res.redirect("back");
            }
        } else {
            console.log("Somthing Wrong...");
            return res.redirect("back")
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

exports.signIn = async (req, res) => {
    try {
        let loginAdmin = await admin.findOne({ email: req.body.email });
        console.log(loginAdmin);
        if (loginAdmin) {
            if (req.body.password === loginAdmin.password) {
                console.log("Login Successful");
                // let userLogin = await admin.findById(req.cookies.admin._id);
                res.cookie("admin", loginAdmin);
                // return res.redirect("/home", { userLogin });
                return res.redirect("/home");
            } else {
                console.log("Password is not mathced...");
                return res.redirect("/signIn");
            }
        } else {
            console.log("User not found.....");
            return res.redirect("/signIn");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.home = async (req, res) => {
    try {
        if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.redirect("/");
        }
        else {
            let loginAdmin = await admin.findById(req.cookies.admin._id);
            console.log(loginAdmin.firstname);
            let allBlogs = await blog.find();
            return res.render("home", { loginAdmin, allBlogs });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.logout = (req, res) => {
    res.clearCookie("admin");
    return res.redirect("/");
}