const admin = require('../model/adminModel');
const blog = require('../model/blogModel');

// LOGIN PAGE
exports.signInPage = (req, res) => {
    // req.isAuthenticated()
    // This checks if the user is already logged in (authenticated).
    // It is a method provided by Passport.js, which returns true if the user is logged in and false otherwise.
    if (req.isAuthenticated()) {
        return res.render('home');
    }
    else {
        return res.render("Auth/signIn");
    }
}

// LOGIN
exports.signIn = async (req, res) => {
    try {
        req.flash('success', 'Login Successfully...');
        return res.redirect("/home");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

// SIGN UP PAGE
exports.signUpPage = (req, res) => {
    return res.render('Auth/signUp');
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

// HOME PAGE
exports.home = async (req, res) => {
    const category = req.query.category;
    if (category && category !== "All") {
        let allBlogs = await blog.find({ category: category });
        return res.render('home', { allBlogs, category });
    } else {
        let allBlogs = await blog.find();
        return res.render('home', { allBlogs });
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("/");
    })
}

// exports.logout = (req, res) => {
//     if (req.method === 'POST') { // Check if the request method is POST
//         req.session.destroy((err) => {
//             if (err) {
//                 console.log(err);
//             }
//             return res.redirect("/");
//         });
//     } else {
//         // Handle invalid request method (e.g., GET)
//         return res.redirect("/home");
//     }
// };


// exports.logout = async (req, res) => {
//     if (req.method === 'get') { // Check if the request method is POST
//         let allBlogs = await blog.find();
//         return res.redirect("/home", { allBlogs });
//     }
// }

// ------------LOGOUT-------------
