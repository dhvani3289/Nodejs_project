const admin = require('../model/adminModel');
const blog = require('../model/blogModel');

// SIGN UP PAGE
exports.signUpPage = (req, res) => {
    return res.render('Auth/signUp');
}

// SIGN IN PAGE
exports.signInPage = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('home');
    }
    else {
        return res.render("Auth/signIn");
    }
}

// SIGN UP 
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

// SIGN IN
exports.signIn = async (req, res) => {
    try {
        return res.redirect("/home");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

// HOME PAGE
exports.home = async (req, res) => {
    const category = req.query.category;
  
    if (category && category !== "All") { 
      let allBlogs = await blog.find({ category: category });
      return res.render('home', { allBlogs, user: req.user });
    } else { 
      let allBlogs = await blog.find(); 
      return res.render('home', { allBlogs, user: req.user });
    }
  };

// LOGOUT
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("/");
    })
}