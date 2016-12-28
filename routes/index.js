var express = require("express");
var router = express.Router();

//INDEX
router.get("/", function(req, res) {
   res.render("landing"); 
});

module.exports = router;