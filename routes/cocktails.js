var express     = require("express"),
    Cocktail    = require("../models/cocktail"),
    router      = express.Router(),
    middleware  = require("../middleware");
    
// INDEX
router.get("/", function(req, res) {
    Cocktail.find({}, function(err, cocktails) {
        if(err) { 
            console.log(err) 
        } else {
            res.render("cocktails/index", {cocktails: cocktails}); 
        }
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("cocktails/new");
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    }
   Cocktail.create(req.body.cocktail, function(err, cocktail) {
       if(err) { 
            console.log(err); 
        } else {
            cocktail.author = author;
            cocktail.save();
            res.redirect("/cocktails");
        }
   });
});

// SHOW
router.get("/:id", function(req, res) {
   Cocktail.findById(req.params.id).populate("comments").exec(function(err, cocktail) {
       if(err) { 
            console.log(err); 
        } else {
            res.render("cocktails/show", {cocktail: cocktail});
        }
   }); 
});

module.exports = router;