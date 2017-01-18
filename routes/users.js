var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    Cocktail = require("../models/cocktail");
    
// INDEX of users
router.get("/", function(req, res) {
    User.find({}, function(err, users) {
        if(err) { 
            console.log(err) 
        } else {
            res.render("users/index", {users: users}); 
        }
    });
});    
    
// SHOW USER PAGE
router.get("/:id", function(req, res) {
    User.findById(req.params.id).populate("cocktails").exec(function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            res.render("users/show", {user: foundUser}); 
        }
    });
});

// EDIT USER INFO
router.get("/:id/edit", function(req, res) {
    User.findById(req.params.id, function(err, user) {
        res.render("users/edit", {user: user}); 
    });
});

// UPDATE USER INFO
router.put("/:id", function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log(err);
        } else {
            user.image = req.body.image;
            user.bio = req.body.bio;
            user.liquor = req.body.liquor;
            user.save();
            res.redirect("/users/" + req.params.id);
        }
    });
});

module.exports = router;