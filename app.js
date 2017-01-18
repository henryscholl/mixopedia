var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    app             = express(),
    Comment         = require("./models/comment"),
    Cocktail        = require("./models/cocktail"),
    User            = require("./models/user"),
    indexRoutes     = require("./routes/index"),
    cocktailRoutes  = require("./routes/cocktails"),
    commentRoutes   = require("./routes/comments"),
    userRoutes      = require("./routes/users"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    seedDB          = require("./seeds");
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/cocktail_app");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();   // seed the database

// Passport config
app.use(require("express-session")({
    secret: "Secret string that should not be public",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
    
app.use("/", indexRoutes);
app.use("/cocktails", cocktailRoutes);
app.use("/cocktails/:id/comments", commentRoutes);
app.use("/users", userRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has started!"); 
});