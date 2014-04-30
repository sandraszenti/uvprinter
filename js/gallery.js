function renderThumbnails () {
	// load gallery images with embedded JS
	var data = {};
	var html = new EJS({url: '../js/photos.ejs'}).render(data);
	$(html).appendTo($("#gallery"));
}

function arrowNav(direction) {
	var currentPhotoIndex = $("#large-photo img").attr("src").split("/")[3].split("_")[2].split(".")[0];
	var indexOfPhoto;
	if (direction.id === "back") {
		indexOfPhoto = parseInt(currentPhotoIndex) - 1;
		if (indexOfPhoto < 1) {
			indexOfPhoto = 75;
		}
	}
	else if (direction.id === "forward") {
		indexOfPhoto = parseInt(currentPhotoIndex) + 1;
		if (indexOfPhoto > 75) {
			indexOfPhoto = 1;
		}
	}
	else {
		return;
	}

	$("#large-photo img").attr("src", "../img/gallery/lef20_nyiltnap_" + indexOfPhoto + ".jpg" );
	$("#large-photo img").css("margin-left", "-" + $("#large-photo img").width()/2 + "px");
}

function thumbnailClick(photo) {
	// reload large photo div content with clicked photo
	var indexOfPhoto = $(photo).attr("src").split("/")[3].split("_")[2].split(".")[0];
	$("#large-photo img").attr("src", "../img/gallery/lef20_nyiltnap_" + indexOfPhoto + ".jpg" );
	$("#large-photo img").css("margin-left", "-" + $("#large-photo img").width()/2 + "px");
}

function flipQuote(quote) {
	$("#testimonials blockquote").css("bottom", "-400px");
	$("#testimonials div p").css("display", "block");
	$(quote).prev("div").children("p").fadeOut();
	$(quote).animate({
		position: "relative",
		bottom: "-200px"
	}, 400);
}

function initialize() {

	// set large photo div height 
	$("#large-photo").css("height", $("#large-photo").height() + "px");
	$("#large-photo span").css("line-height", $("#large-photo").height() + "px");
	$("#large-photo img").css("margin-left", "-" + $("#large-photo img").width()/2 + "px");
	$(window).resize(function () {
		$("#large-photo").css("height", $("#large-photo img").height() + "px");	
		$("#large-photo span").css("line-height", $("#large-photo").height() + "px")	
		$("#large-photo img").css("margin-left", "-" + $("#large-photo img").width()/2 + "px");
	});
	
	renderThumbnails();

	$("#large-photo span").click(function () { arrowNav(this); });
	$("div.photo img").click(function () { thumbnailClick(this); });
	$("#testimonials .front").click(function () { flipQuote($(this).next()); })

}

$(document).ready(initialize);