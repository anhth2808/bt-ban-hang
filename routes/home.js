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


//
function createDonHang(req, res) {
    DH.create({
        tenKhachHang: req.body.tenKhachHang,
        diaChi: req.body.diaChi,
        dienThoai: req.body.dienThoai,
        ngayDatHang: req.body.ngayDatHang,
        ngayGiaoHang: req.body.ngayGiaoHang,
        ghiChu: req.body.ghiChu,
        sanPham: req.body.sanPham,
        thanhTien: req.body.thanhTien
    }, function(err, dh) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 201, dh);
        }
    })
}


router.post("/", createDonHang)


module.exports = router;