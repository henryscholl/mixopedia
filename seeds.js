var mongoose = require("mongoose");
var Cocktail = require("./models/cocktail");
var Comment  = require("./models/comment");

var data = [
    {
        name: "Manhattan",
        image: "http://experiencenomad.com/wp-content/uploads/2012/06/manhattan-cocktail-recipe-.jpg",
        ingredients: "Rye, Sweet Vermouth, Bitters",
        recipe: "Stir ingredients over ice, strain into a chilled glass, garnish with maraschino cherry or orange peel."
    },
    {
        name: "Margarita",
        image: "http://www.seriouseats.com/recipes/assets_c/2015/04/20150323-cocktails-vicky-wasik-margarita-thumb-1500xauto-421493.jpg",
        ingredients: "Tequila, Triple Sec, Lime",
        recipe: "Stir ingredients over ice, strain into a chilled glass, garnish with maraschino cherry or orange peel."
    },
    {
        name: "Negroni",
        image: "http://esq.h-cdn.co/assets/cm/15/05/54ccf45e14058_-_esq-negroni-nuovo-100112-xlg.jpg",
        ingredients: "Gin, Campari, Sweet Vermouth",
        recipe: "Stir ingredients over ice, strain into a chilled glass, garnish with maraschino cherry or orange peel."
    }
]

function seedDB() {
    Cocktail.remove({}, function(err) {
        if(err) {
            console.log(err);
        } 
        console.log("removed cocktails");
        data.forEach(function(seed) {
            Cocktail.create(seed, function(err, cocktail) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added a cocktail");
                    Comment.create(
                        {
                            text: "Great drink! I used more bitters.",
                            author: "SomeHipster"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                cocktail.comments.push(comment);
                                cocktail.save();
                                console.log("Created comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;