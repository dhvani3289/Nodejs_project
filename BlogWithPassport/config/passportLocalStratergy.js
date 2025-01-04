const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const admin = require('../model/adminModel');

passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
        try {
            let loginAdmin = await admin.findOne({ email: email });

            if (loginAdmin) {
                if (loginAdmin.password === password) {
                    done(null, loginAdmin);
                } else {
                    done(null, false);
                }
            } else {
                return done(null, false);
            }
        } catch (error) {
            console.log(error);
            return done(error, false);
        }
    }));

passport.serializeUser((admin, done) => {
    done(null, admin._id);
});

passport.deserializeUser(async (id, done) => {
    let loginAdmin = await admin.findById(id);
    done(null, loginAdmin);
});

passport.validateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect("/")
    }
}

passport.setLocalUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    next();
}

module.exports = passport;