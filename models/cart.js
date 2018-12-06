module.exports = function Cart(oldCart) {
    this.sanphams = oldCart.sanphams;
    this.tongSoLuong = oldCart.tongSoLuong;
    this.thanhTien = oldCart.thanhTien;

    this.add = function(sanpham, id) {
        console.log("sanpham:", sanpham);
        console.log("id: ", id);
        var storedItem = this.sanphams[id];
        if (!storedItem) {
            storedItem = this.sanphams[id] = { sanpham: sanpham, soLuong: 0, donGia: 0};
        }
        storedItem.soLuong++;
        storedItem.donGia = storedItem.sanpham.donGia * storedItem.soLuong;
        this.tongSoLuong++;
        this.thanhTien += storedItem.donGia;

    }

    this.generateArray = function() {
        var arr = [];
        for (var id in this.sanphams) {
            arr.push(this.sanphams[id])
        }
        return arr;
    }
}