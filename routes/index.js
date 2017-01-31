var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    Cocktail    = require("../models/cocktail"),
    passport = require("passport");

//INDEX
router.get("/", function(req, res) {
   Cocktail.find({}).limit(8).exec(function(err, cocktails) {
        if(err) { 
            console.log(err) 
        } else {
            res.render("cocktails/index", {cocktails: cocktails}); 
        }
    });
});

//Auth routes

router.get("/register", function(req, res) {
    res.render("register");
});

// Sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome, " + user.username + "!");
            res.redirect("/");
        });
    });
});

// Show login form
router.get("/login", function(req, res) {
    res.render("login");
});

// Log user in
router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res) {
            var redirectTo = req.session.redirectTo ? req.session.redirectTo : "/";
            delete req.session.redirectTo;
            req.flash("success", "Welcome back, " + req.user.username + "!");
            res.redirect(redirectTo);
});

// Logout route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "You are now logged out.");
   res.redirect("/");
});

module.exports = router;