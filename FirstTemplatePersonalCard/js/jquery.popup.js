// Variables
"use strict";

var nbpics;
var currentpic;
var popup = $(".lx-popup");
var popupImg = $(".lx-popup-image > img");
var popupTitle = $(".lx-popup-details ul li:eq(0) span");
var popupCpic = $(".lx-popup-details ul li:eq(1) span");
var popupInfo = $(".lx-popup-infos");
var slideSize = $(".lx-popup-image").outerWidth();
var infoSize = $(".lx-popup-infos").outerWidth();
// espand popup click event
$("i.fa-search-plus", ".lx-projects").on("click",function() {
	// Mini Slide Init
	if($(window).width()  <= 768){
		slideSize = $(window).width();
		infoSize = $(window).width();
	}
	if($(".lx-mini-slide").length){
		$(".lx-popup-infos").css({"width":infoSize+"px"});
		$(".lx-popup-image").css({"width":slideSize+"px"});
		$(".lx-mini-slide-nav").css({"width":slideSize+"px"});
		$(".lx-mini-slide ul li").css({"width":slideSize+"px"});
		$(".lx-mini-slide ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+slideSize+"px"});		
	}
    // set nbpics to 0
    nbpics = 0;
    // get the number of pictures
    for (var i = 0; i < $(".lx-projects-item", ".lx-projects").length; i++) {
        if ($(".lx-projects-item:eq(" + i + ")", ".lx-projects").parent().width() !== 0) {
            // increment the number of pictures
            nbpics += 1;
            // pot the number of picture in the attribute data
            $(".lx-projects-item:eq(" + i + ")", ".lx-projects").attr("data", nbpics);
        }
    }
    // get current picture number
    currentpic = $(this).parent().attr("data");
    // transmit information to the popup
	if($(this).parent().find(".lx-mini-slide").length){
		popupImg.css("display","none");
		popupImg.parent().find(".lx-mini-slide").remove();
		popupImg.parent().append('<div class="lx-mini-slide">'+$(this).parent().find(".lx-mini-slide").html()+'</div>')
	}
	else{
		popupImg.css("display","block");
		popupImg.attr("src", $(this).parent().find("img").attr("src"));
	}
	window.setTimeout(function(){
		popupImg.css("transform", "scale(1)");
	},1);
	var info = "<h3>" + $(this).parent().find("h4").text() + "</h3>";
	$(this).parent().find("input[type='hidden']").each(function(){
		if($(this).attr("data-type") == "paragraph"){
			info = info + "<p>" + $(this).attr("data-content") + "</p>";
		}
		else if($(this).attr("data-type") == "feature"){
			info = info + "<p><b>" + $(this).attr("data-title") + " : </b>" + $(this).attr("data-content") + "</p>";
		}
	});
	popupInfo.html(info);
    popupTitle.text($(this).parent().find("h4").text());
    popupCpic.text(currentpic + " of " + nbpics);
    popup.css({
        "display": "block"
    });
    return false;
});

// popup left arrow click event
$(".lx-popup-inside a .fa-caret-left", ".lx-popup").on("click",function() {
	// Mini Slide Init
	if($(".lx-mini-slide").length){
		$(".lx-popup-infos").css({"width":infoSize+"px"});
		$(".lx-popup-image").css({"width":slideSize+"px"});
		$(".lx-mini-slide-nav").css({"width":slideSize+"px"});
		$(".lx-mini-slide ul li").css({"width":slideSize+"px"});
		$(".lx-mini-slide ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+slideSize+"px"});		
	}
    // test if the curent picture is equal to 1 or not
    if (currentpic === 1) {
        currentpic = nbpics;
    } else {
        currentpic = parseInt(currentpic) - 1;
    }
    // transmit information to the popup
    
	if($(".lx-projects-item[data='" + currentpic + "']", ".lx-projects").find(".lx-mini-slide").length){
		popupImg.css("display","none");
		popupImg.parent().find(".lx-mini-slide").remove();
		popupImg.parent().append('<div class="lx-mini-slide">'+$(".lx-projects-item[data='" + currentpic + "']", ".lx-projects").find(".lx-mini-slide").html()+'</div>')
	}
	else{
		popupImg.css("display","block");
		popupImg.attr("src", $(".lx-projects-item[data='" + currentpic + "'] img", ".lx-projects").attr("src"));
	}
	var info = "<h3>" + $(".lx-projects-item[data='" + currentpic + "'] h4", ".lx-projects").text() + "</h3>";
	$(".lx-projects-item[data='" + currentpic + "'] input[type='hidden']", ".lx-projects").each(function(){
		if($(this).attr("data-type") == "paragraph"){
			info = info + "<p>" + $(this).attr("data-content") + "</p>";
		}
		else if($(this).attr("data-type") == "feature"){
			info = info + "<p><b>" + $(this).attr("data-title") + " : </b>" + $(this).attr("data-content") + "</p>";
		}
	});
	popupInfo.html(info);
    popupTitle.text($(".lx-projects-item[data='" + currentpic + "'] h4", ".lx-projects").text());
    popupCpic.text(currentpic + " of " + nbpics);
    return false;
});

// popup right arrow click event
$(".lx-popup-inside a .fa-caret-right", ".lx-popup").on("click",function() {
	// Mini Slide Init
	if($(".lx-mini-slide").length){
		$(".lx-popup-infos").css({"width":infoSize+"px"});
		$(".lx-popup-image").css({"width":slideSize+"px"});
		$(".lx-mini-slide-nav").css({"width":slideSize+"px"});
		$(".lx-mini-slide ul li").css({"width":slideSize+"px"});
		$(".lx-mini-slide ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+slideSize+"px"});		
	}
    // test if the current picture is equal to the number pictures or not
    if (currentpic === nbpics) {
        currentpic = 1;
    } else {
        currentpic = parseInt(currentpic) + 1;
    }
    // transmit information to the popup
	if($(".lx-projects-item[data='" + currentpic + "']", ".lx-projects").find(".lx-mini-slide").length){
		popupImg.css("display","none");
		popupImg.parent().find(".lx-mini-slide").remove();
		popupImg.parent().append('<div class="lx-mini-slide">'+$(".lx-projects-item[data='" + currentpic + "']", ".lx-projects").find(".lx-mini-slide").html()+'</div>')
	}
	else{
		popupImg.css("display","block");
		popupImg.attr("src", $(".lx-projects-item[data='" + currentpic + "'] img", ".lx-projects").attr("src"));
	}
	var info = "<h3>" + $(".lx-projects-item[data='" + currentpic + "'] h4", ".lx-projects").text() + "</h3>";
	$(".lx-projects-item[data='" + currentpic + "'] input[type='hidden']", ".lx-projects").each(function(){
		if($(this).attr("data-type") == "paragraph"){
			info = info + "<p>" + $(this).attr("data-content") + "</p>";
		}
		else if($(this).attr("data-type") == "feature"){
			info = info + "<p><b>" + $(this).attr("data-title") + " : </b>" + $(this).attr("data-content") + "</p>";
		}
	});
	popupInfo.html(info);
    popupTitle.text($(".lx-projects-item[data='" + currentpic + "'] h4", ".lx-projects").text());
    popupCpic.text(currentpic + " of " + nbpics);
    return false;
});

// popup remove click event
$(".lx-popup-inside a .lnr-cross", ".lx-popup").on("click",function() {
    // hide popup
    popup.css("display", "none");
	popupImg.css("transform", "scale(0.5)");
    return false;
});

// Hide the popup when esc key is clicked
$(document).on("keyup", function(e) {
    if (e.keyCode === 27 || e.keyCode === 13) {
        // hide popup
        popup.css("display", "none");
		popupImg.css("transform", "scale(0.5)");
    }
    if (e.keyCode === 37) {
        $(".lx-popup-inside a .fa-caret-left").trigger("click");
    }	
	if (e.keyCode === 39) {
        $(".lx-popup-inside a .fa-caret-right").trigger("click");
    }	
    return false;
});

$("body").on("mouseup",function (e){
	var bloc = $(".lx-popup-inside *");
	if (!bloc.is(e.target)){
        popup.css("display", "none");
		popupImg.css("transform", "scale(0.5)");
	}
});

// search-plus click event
$("a .fa-search-plus", ".lx-projects").on("click",function(event) {
    // stop hide popup event
    event.stopPropagation();
    return false;
});

// arrows click event
$(".lx-popup-content,.lx-popup-inside a .fa-caret-left,.lx-popup-inside a .fa-caret-right", ".lx-popup").on("click",function(event) {
    // stop hide popup event
    event.stopPropagation();
    return false;
});