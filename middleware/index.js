var Cocktail = require("../models/cocktail"),
    Comment  = require("../models/comment");

var middlewareObj = {};

// middleware

middlewareObj.checkCocktailOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Cocktail.findById((req.params.id), function(err, cocktail) {
        if(err) {
            req.flash("error", "Cocktail not found");
            res.redirect("back");
        } else {
            // does user own cocktail?
            if(cocktail.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.commentid, function(err, comment) {
            if(err) {
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })    
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please log in first!");
    res.redirect("/login");
}

module.exports = middlewareObj;