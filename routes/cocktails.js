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
            req.user.cocktails.push(cocktail);
            req.user.save();
            req.flash("success", "Your cocktail has been added!");
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

// EDIT

router.get("/:id/edit", middleware.checkCocktailOwnership, function(req, res) {
    Cocktail.findById((req.params.id), function(err, cocktail) {
        res.render("cocktails/edit", {cocktail: cocktail});
    });
});

// UPDATE

router.put("/:id", middleware.checkCocktailOwnership, function(req, res) {
    Cocktail.findByIdAndUpdate(req.params.id, req.body.cocktail, function(err, updatedCocktail) {
        if(err) {
            res.redirect("/cocktails");
        } else {
            req.flash("success", "Your cocktail was updated!");
            res.redirect("/cocktails/" + req.params.id);
        }
    });
});

// DESTROY

router.delete("/:id", middleware.checkCocktailOwnership, function(req, res) {
   Cocktail.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           res.redirect("/cocktails");
       } else {
           req.flash("success", "Your cocktail was removed.");
           res.redirect("/cocktails");
       }
   });
});

// SEARCH

router.post("/search", function(req, res) {
    if (req.body.query) {
    var results = new RegExp(req.body.query, "i")
    Cocktail.find({$or: [
        {ingredients: results},
        {name: results}
        ]}, 
        function(err, cocktails) {
        res.render("cocktails/results", {cocktails: cocktails, query: req.body.query});
    });
    } else {
        res.redirect("/cocktails");
    }
});

module.exports = router;