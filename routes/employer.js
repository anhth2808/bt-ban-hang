var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();



var Employer = mongoose.model("Employer");
var SanPham = mongoose.model("SanPham");
var DonHang = mongoose.model("DonHang");

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};


var checkAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/employer/login");
  }
}


router.get("/", checkAuth, function(req, res, next) {
  res.send(req.session);
})



/* SanPham controller */

router.get("/form", function(req, res, next) {
  res.render("sanpham-post", {});
})





/* GET list SanPham */
router.get("/sanpham", function(req, res, next) {

  SanPham
    .find()
    .exec(function(err, sp) {
      if (!sp) {
        sendJSONresponse(res, 404, {
          "message": "SanPham is not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, sp);
    })
})

router.get("/sanpham/:id", function(req, res) {
  SanPham.findById(req.params.id, function(err, sp) {
    if (!sp) {
      sendJSONresponse(res, 404, {
        "message": "sp is not found"
      });
      return;
    } else if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }
    sendJSONresponse(res, 200, sp);
  })
})

router.post("/sanpham", function(req, res) {
  SanPham
    .create({
      tenSanPham: req.body.tenSanPham,
      donGia: req.body.donGia,
      soLuong: req.body.soLuong,
      anh: req.body.anh
    }, function(err, sp) {
      if (err) {
        sendJSONresponse(res, 400, err);
        return;
      } else {
        sendJSONresponse(res, 201, sp);
      }
    })
})

router.put("/sanpham/:id", function(req, res) {
  SanPham
    .findById(req.params.id)
    .exec(function(err, sp) {
      if (!sp) {
        sendJSONresponse(res, 404, {
          "message": "sp is not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }

      sp.tenSanPham = req.body.tenSanPham;
      sp.donGia = req.body.donGia;
      sp.soLuong = req.body.soLuong;
      sp.anh = req.body.anh;

      sp.save(function(err, sp) {
        if (err) {
          sendJSONresponse(res, 404, err);
          return;
        } else sendJSONresponse(res, 200, sp)
      });

    })
})


router.delete("/sanpham/:id", function(req, res) {

  SanPham
    .findByIdAndRemove(req.params.id)
    .exec(
      function(err, sp) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }

        console.log("SP id", req.params.id, "deleted");
        sendJSONresponse(res, 204, null);

      }
    )
})





/* DonHang controller */

router.get("/donhang", function(req, res) {
  DonHang
    .find()
    .exec(
      function(err, dh) {
        if (err) {
          sendJSONresponse(res, 404, err);
          return;
        }
        
        sendJSONresponse(res, 200, dh);
      }
    )
})

router.get("/donhang/:donhangid", function(req, res) {
  var donhangid = req.params.donhangid;
  DonHang
  .findById(donhangid)
  .exec(
    function(err, dh) {
      if (!dh) {
        sendJSONresponse(res, 404, {
          "message": "dh is not found"
        })
        return;
      } else if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, dh);
    }
  )
})

router.post("/donhang", function(req, res) {
  console.log("start");
  DonHang.create({
    tenKhachHang: req.body.tenKhachHang,
    diaChi: req.body.diaChi,
    dienThoai: req.body.dienThoai,
    ngayDatHang: req.body.ngayDatHang,
    ngayGiaoHang: req.body.ngayGiaoHang,
    ghiChu: req.body.ghiChu,
    sanPham: req.body.sanPham,
    thanhTien: req.body.thanhTien
  }, function (err, dh) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, dh);
    }
  })
})

router.put("/donhang/:donhangid", function(req, res) {
  var donhangid = req.params.donhangid;

  DonHang
    .findById(donhangid)
    .exec(
      function(err, dh) {
        if (!dh) {
          sendJSONresponse(res, 404, {
            "message": "dh is not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 404, err);
          return;
        }

        dh.tenKhachHang = req.body.tenKhachHang;
        dh.diaChi = req.body.diaChi;
        dh.dienThoai = req.body.dienThoai;
        dh.ngayDatHang = req.body.ngayDatHang;
        dh.ngayGiaoHang = req.body.ngayGiaoHang;
        dh.ghiChu = req.body.ghiChu;
        dh.thanhTien = req.body.thanhTien;
        dh.sanPham = req.body.sanPham;

        dh.save(function(err, dh) {
          if (err) {
            sendJSONresponse(res, 404, err);
            console.log(err);
            return;
          }
          sendJSONresponse(res, 200, dh);
        })
      }
    )
})

router.delete("/donhang/:donhangid", function(req, res) {
  var donhangid = req.params.donhangid;

  DonHang
    .findByIdAndRemove(donhangid)
    .exec(
      function(err, dh) {
        if (err) {
          sendJSONresponse(res, 404, err);
          return;
        } else {
          console.log("SP id", donhangid, "deleted");
          sendJSONresponse(res, 204, null);
        }
      }
    )
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