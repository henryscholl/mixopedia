var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    image: {type: String, default: "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png"},
    bio: {type: String, default: "Bio goes here..."},
    liquor: {type: String, default: "Liquor collection goes here..."},
    cocktails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cocktail"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);