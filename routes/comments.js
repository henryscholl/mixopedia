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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    cocktail.comments.push(comment);
                    cocktail.save();
                    req.flash("success", "Your comment was added!");
                    res.redirect("/cocktails/" + cocktail._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:commentid/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.commentid, function(err, comment) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/edit", {comment: comment, cocktail_id: req.params.id}); 
        }
    });
});

// UPDATE
router.put("/:commentid", middleware.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndUpdate(req.params.commentid, req.body.comment, function(err, comment) {
        if(err) {
            console.log(err);
        } else {
            req.flash("success", "Your comment was updated!");
            res.redirect("/cocktails/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:commentid", middleware.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndRemove(req.params.commentid, function(err) {
       if(err) {
           console.log(err);
       } else {
           req.flash("success", "Your comment was removed.");
           res.redirect("/cocktails/" + req.params.id);
       }
   }); 
});

module.exports = router;