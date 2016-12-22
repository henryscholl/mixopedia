var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express();
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/cocktail_app");
    
// SCHEMA setup

var cocktailSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    recipe: String,
    image: String
});

var Cocktail = mongoose.model("Cocktail", cocktailSchema);

// Cocktail.create(
//     {
//         name: "Negroni",
//         ingredients: "Gin, Sweet Vermouth, Campari",
//         recipe: "Pour equal parts of ingredients into mixing glass with ice cubes. Stir well. Strain in chilled rocks glass and garnish with orange peel",
//         image: "http://www.squirrelfarts.com/sfblog/wp-content/uploads/2212/03/rule37negroni_rehorst.jpg"
//     }, function(err, cocktail) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Newly created cocktail");
//             console.log(cocktail);
//         }
//     });
    
app.get("/", function(req, res) {
   res.render("index"); 
});

app.get("/cocktails", function(req, res) {
    Cocktail.find({}, function(err, cocktails) {
        if(err) { 
            console.log(err) 
        } else {
            res.render("cocktails", {cocktails: cocktails}); 
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
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has started!"); 
});