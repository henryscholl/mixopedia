var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express(),
    Comment     = require("./models/comment"),
    Cocktail    = require("./models/cocktail"),
    seedDB      = require("./seeds");
    
seedDB();    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/cocktail_app");
    
app.get("/", function(req, res) {
   res.render("landing"); 
});

app.get("/cocktails", function(req, res) {
    Cocktail.find({}, function(err, cocktails) {
        if(err) { 
            console.log(err) 
        } else {
            res.render("cocktails/index", {cocktails: cocktails}); 
        }
    });
});

app.post("/cocktails", function(req, res) {
   Cocktail.create(req.body.cocktail, function(err, cocktail) {
       if(err) { 
            console.log(err); 
        } else {
            res.redirect("/cocktails");
        }
   });
});

app.get("/cocktails/new", function(req, res) {
    res.render("cocktails/new");
});

app.get("/cocktails/:id", function(req, res) {
   Cocktail.findById(req.params.id).populate("comments").exec(function(err, cocktail) {
       if(err) { 
            console.log(err); 
        } else {
            res.render("cocktails/show", {cocktail: cocktail});
        }
   }); 
});

app.get("/cocktails/:id/comments/new", function(req, res) {
    Cocktail.findById(req.params.id, function(err, cocktail) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {cocktail: cocktail});
        }
    });
});

app.post("/cocktails/:id/comments", function(req, res) {
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

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has started!"); 
});