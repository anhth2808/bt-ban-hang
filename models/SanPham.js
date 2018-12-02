var mongoose = require('mongoose');


var SanPhamSchemal = new mongoose.Schema({
    tenSanPham: String,
    donGia: Number,
    anh: String
}, {
        usePushEach: true // add this becasue $pushall is nolonger support in mongose 3.4>
    });

mongoose.model('SanPham', SanPhamSchemal);