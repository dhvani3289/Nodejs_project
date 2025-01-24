const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const admin = require('../model/adminModel');

passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
        try {
            let loginAdmin = await admin.findOne({ email: email });
            console.log(loginAdmin, "loginAdmin");
            if (loginAdmin) {
                if (loginAdmin.password == password) {
                    return done(null, loginAdmin);
                } else {
                    return done(null, false);
                }
            }
        } catch (error) {
            console.log(error);
            return done(error, false);
        }
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user._id);
})

passport.deserializeUser(async (id, cb) => {
    let loginAdmin = await admin.findById(id);
    cb(null, loginAdmin);
});

passport.validateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/');
    }
}

passport.setLocalUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    next();
}


module.exports = passport;