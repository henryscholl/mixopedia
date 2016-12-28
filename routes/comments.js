var express = require("express"),
    router = express.Router({mergeParams: true}),
    Cocktail = require("../models/cocktail"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");
    
    
// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Cocktail.findById(req.params.id, function(err, cocktail) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {cocktail: cocktail});
        }
    });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    Cocktail.findById(req.params.id, function(err, cocktail) {
        if(err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    cocktail.comments.push(comment);
                    cocktail.save();
                    res.redirect("/cocktails/" + cocktail._id);
                }
            });
        }
    });
});

module.exports = router;