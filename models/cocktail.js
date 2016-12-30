var mongoose = require("mongoose");

var cocktailSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    recipe: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Cocktail", cocktailSchema);