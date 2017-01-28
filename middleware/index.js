var Cocktail = require("../models/cocktail"),
    Comment  = require("../models/comment"),
    User     = require("../models/user");

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

middlewareObj.checkUserPermission = function(req, res, next) {
    if(req.isAuthenticated()) {
         User.findById(req.params.id, function(err, user) {
        if(err) {
            res.redirect("back");
        } else {
            // is logged in user same as user page owner?
            if(user._id.equals(req.user._id)) {
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

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    // set temporary forwarding path before redirecting to login page
    req.session.redirectTo = req.originalUrl;
    req.flash("error", "Please log in first!");
    res.redirect("/login");
}

module.exports = middlewareObj;