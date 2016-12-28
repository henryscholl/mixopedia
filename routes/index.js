var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    passport = require("passport");

//INDEX
router.get("/", function(req, res) {
   res.render("landing"); 
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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/cocktails");
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
        successRedirect: "/cocktails",
        failureRedirect: "/login"
    }), function(req, res) {
});

// Logout route
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/cocktails");
});

module.exports = router;