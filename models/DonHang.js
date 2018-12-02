var mongoose = require('mongoose');

var SanPhamSchemal = new mongoose.Schema({
    maSanPham: String,
    Soluong: number,
})

var DonHangSchemal = new mongoose.Schema({
    diaChi: String,
    dienThoai: String,
    ngayDatHang: Date,
    ngayGiaoHang: Date,
    ghiChu: String,
    sanPham: [SanPhamSchemal],
    thanhTien: Number
}, {
    usePushEach: true // add this becasue $pushall is nolonger support in mongose 3.4>
});

mongoose.model('DonHang', DonHangSchemal);