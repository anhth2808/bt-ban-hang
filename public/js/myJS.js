$(document).ready(function(){
	// Điều khiển nút bấm quay về đầu trang hiển thị khi cuộn màn hình
	$(window).scroll(function () {
		if ($(this).scrollTop() > 15) {		// Dòng cuộn lệch 30
			$('#back-to-top').tooltip();
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
			$('#back-to-top').tooltip('hide');
		}
	});
	// Quay về đầu trang khi click
	$('#back-to-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
//************************************************************************//
	//... tiếp tục viết code javascript
	var user = document.getElementById("user");
	var password = document.getElementById("password");
	// var bt = document.getElementById("bt");
	$('#bt').on('click', function () {
		if ($('#user').val() == 'admin@gmail.com' && $('#password').val() == 'admin') {
			location.href = "admin.html";
		}
	});

	$('#header-logo').on('click', function () {
		window.location = "/";
	});

});

// window.onload = myFunction;

function onClick () {
	// body...
	if (confirm('Bạn có muốn thêm đơn hàng không!') == true) {
		var x = document.getElementById("sl").innerHTML;
		var y = parseInt(x);
		y = y + 1;
		document.getElementById("sl").innerHTML = y.toString();
	}
}

filterSelection("all")
function filterSelection(c) {
	var x = document.getElementsByClassName("product");
	if (c == "all") c = "";
	for (var i = 0; i < x.length; i++) {
		RemoveClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
	}
}

function AddClass(element, name) {
	var arr1 = element.className.split(" ");
	var arr2 = name.split(" ");
	for (var i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) == -1) {
			element.className += " " + arr2[i];
		}
	}
}

function RemoveClass(element, name) {
	var arr1 = element.className.split(" ");
	var arr2 = name.split(" ");
	for (var i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
	}
	element.className = arr1.join(" ");
}

// Add active class to the current button
// var myBtn = document.getElementById("myBtn");
// var btnSearch = myBtn.getElementsByClassName("btnSearch");
// for (var i = 0; i < btnSearch.length; i++) {
// 	btnSearch[i].addEventListener("click", function () {
// 		var current = document.getElementsByClassName("active");
// 		current[0].className = current[0].className.replace(" active", "");
// 		this.className += " active";
// 	});
// }