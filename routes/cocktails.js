var express     = require("express"),
    Cocktail    = require("../models/cocktail"),
    router      = express.Router();
    
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
router.get("/new", function(req, res) {
    res.render("cocktails/new");
});

// CREATE
router.post("/", function(req, res) {
   Cocktail.create(req.body.cocktail, function(err, cocktail) {
       if(err) { 
            console.log(err); 
        } else {
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