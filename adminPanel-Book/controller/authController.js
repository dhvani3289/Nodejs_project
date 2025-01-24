const admin = require('../model/adminModel');

// LOGIN PAGE
exports.loginPage = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('dashboard');
    }
    else {
        return res.render("Authentication/login");
    }
}

// LOGIN
exports.login = async (req, res) => {
    try {
        return res.redirect("/index");
    } catch (error) {
        console.log(error);
        return res.redirect("/login");
    }
}

// SIGN UP PAGE
exports.registerPage = (req, res) => {  
    return res.render('Authentication/register');
}

// SIGN UP 
exports.register = async (req, res) => {
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
                return res.redirect("/auth/login");
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

// LOGOUT
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("/auth/login");
    })
}


