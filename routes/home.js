var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")


var Cart = require("../models/cart");
var DH = mongoose.model('DonHang');
var SanPham = mongoose.model("SanPham");

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};



router.get('/', function(req, res) {
    res.render('home', {});
});


router.get("/add-to-cart/:id", function(req, res, next) {
    var sanphamid = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {sanphams: {}});
    console.log(cart);
    console.log(req.session.cart)
    SanPham
        .findById(sanphamid)
        .exec(function(err, sp) {
            if (err) {
                return res.redirect("/");
            }

            cart.add(sp, sp.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
        })
})

router.get("/shoping-cart", function(req, res, next) {
    if (!req.session.cart) {
        sendJSONresponse(res, 200, req.session.cart); 
    }

    var cart = new Cart(req.session.cart);
    sendJSONresponse(res, 200, cart.generateArray());
})




module.exports = router;