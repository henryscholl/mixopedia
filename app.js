var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    app             = express(),
    Comment         = require("./models/comment"),
    Cocktail        = require("./models/cocktail"),
    indexRoutes     = require("./routes/index"),
    cocktailRoutes  = require("./routes/cocktails"),
    commentRoutes   = require("./routes/comments"),
    seedDB          = require("./seeds");
    
seedDB();    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/cocktail_app");
    
app.use("/", indexRoutes);
app.use("/cocktails", cocktailRoutes);
app.use("/cocktails/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has started!"); 
});