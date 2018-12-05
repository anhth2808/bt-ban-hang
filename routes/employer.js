var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();



var Employer = mongoose.model("Employer");
var SanPham = mongoose.model("SanPham");

var loggedin = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/employer/login");
  }
}




/* GET Home page */

router.get("/", loggedin, function(req, res, next) {
  // res.send(req.session);
  // res.render("admin");
  Employer
    .find()
    .exec(function(err, ) {

    })

})






router.get("/login", function (req, res, next) {
  res.render("login");
})

router.get("/signup", function (req, res, next) {
  res.render("signup");
})

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/employer/login");
})

module.exports = router;