var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")


var DH = mongoose.model('DonHang');


var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};



router.get('/', function(req, res) {
    res.render('home', {});
});





module.exports = router;