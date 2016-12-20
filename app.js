var express = require("express"),
    app     = express();
    
app.set("view engine", "ejs");
    
app.get("/", function(req, res) {
   res.render("index"); 
});

app.get("/cocktails", function(req, res) {
    var cocktails = [
        {name: "Manhattan", image: "https://www.tullamoredew.com/assets/uploads/cocktails/irish-manhattan-cocktail.jpg"},
        {name: "Old Fashioned", image: "https://www.tullamoredew.com/assets/uploads/cocktails/irish-manhattan-cocktail.jpg"},
        {name: "Negroni", image: "https://www.tullamoredew.com/assets/uploads/cocktails/irish-manhattan-cocktail.jpg"}
    ]
   res.render("cocktails", {cocktails: cocktails}); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has started!"); 
});