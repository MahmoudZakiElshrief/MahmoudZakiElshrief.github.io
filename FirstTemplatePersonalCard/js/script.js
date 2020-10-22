// Strict Mode
"use strict";

var ua = navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var isChrome = (!!window.chrome && !!window.chrome.webstore) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua) && /Chrome/i.test(ua) && !/OPR/i.test(ua));

// Windows load event
$(window).on("load", function() {
    // Loader Fade Out
    $(".lx-loader", ".lx-wrapper").fadeOut();
    return false;
});

$(window).on( "orientationchange", function( event ) {
	window.location.href = window.location.href;
});

$(document).on("ready", function() {
	
	// Set body background
	if(isChrome && $(window).width() < 768){
		$("body").css({"background":$(".lx-wrapper").attr("data-background-color")+" url('"+$(".lx-wrapper").attr("data-background")+"') top right no-repeat"});
	}
	else{
		$("body").css({"background":$(".lx-wrapper").attr("data-background-color")+" url('"+$(".lx-wrapper").attr("data-background")+"') center center fixed no-repeat"});
	}
	
	// Resize home and content blocs
	$(".lx-home").css("height",$(".lx-wrapper").height()+"px");
	$(".lx-blocs-content").css("max-height",($(".lx-wrapper").height()-100)+"px");
	if($(window).width() <= 768){
		$(".lx-blocs-content").css("max-height",($(".lx-wrapper").height()-42)+"px");
	}
	
	if($(".lx-main-menu ul").height() > $(window).height()){
		$(".lx-menu-down").css("display","block");
	}
	
	// SlideShow background if it does exist
	if($(".lx-slideshow-background").length){
		for (var i = 0; i < $(".lx-slideshow-img", ".lx-slideshow-background").length; i++) {
			$(".lx-slideshow-img:eq(" + i + ")").css({"background":"url('"+$(".lx-slideshow-img:eq(" + i + ") img").attr("src")+"') no-repeat"});
			$(".lx-slideshow-img:eq(" + i + ") img").remove();
		}	
		
		var j = 0;
		window.setInterval(function(){
			$(".lx-slideshow-img").not(":eq(" + j + ")").fadeOut();
			$(".lx-slideshow-img:eq(" + j + ")").fadeIn();
			j += 1;
			if(j === 3){
				j = 0;
			}
		},4000);
	}
	
	// Set Months
	var month = new Array();
	month[0] = "JAN";
	month[1] = "FEB";
	month[2] = "MAR";
	month[3] = "APR";
	month[4] = "MAY";
	month[5] = "JUN";
	month[6] = "JUL";
	month[7] = "AUG";
	month[8] = "SEP";
	month[9] = "OCT";
	month[10] = "NOV";
	month[11] = "DEC";
	
	// Get Current Date
	var lx_date = new Date();
	$(".lx-day").text(lx_date.getDate());
	$(".lx-month").text(month[lx_date.getMonth()]);
	$(".lx-year").text(lx_date.getFullYear());
	$(".lx-time").text(lx_date.getHours()+":"+lx_date.getMinutes()+":"+lx_date.getSeconds());
	
	// Retreive Time
	window.setInterval(function(){
		var lx_date = new Date();
		$(".lx-time").text(lx_date.getHours()+":"+lx_date.getMinutes()+":"+lx_date.getSeconds());
	},1000);

	// Mini Slide Init
	for(var i=0;i<$(".lx-mini-slide").length;i++){
		$(".lx-mini-slide:eq("+i+") ul li").css({"width":$(".lx-popup-image").outerWidth()+"px"});
		$(".lx-mini-slide:eq("+i+") ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+$(".lx-popup-image").outerWidth()+"px"});		
	}
	
	var patt = /single-post/;
	if(!patt.test(location.pathname)){		
		// Redirection to the requested bloc
		hashHistory();
	}
	
	return false;
});

// Mini Slide Effect
var lx_passed = "yes";
$(".lx-popup-image").delegate(".lx-mini-slide-nav > .fa-angle-right","click",function(){
	if(lx_passed == "yes"){
		lx_passed = "no";
		var ul = $(this).parent().parent().find("ul")
		ul.css({"-webkit-transition":"all 0.4s","transition":"all 0.4s","left":"-"+(ul.find("li").outerWidth()*2)+"px"});
		window.setTimeout(function(){
			ul.css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+ul.find("li").outerWidth()+"px"});
			var item = "<li style='width:"+ul.find("li").outerWidth()+"px;'>"+ul.find("li:eq(0)").html()+"</li>";
			ul.append(item);
			ul.find("li:eq(0)").remove();
			lx_passed = "yes";
		},500);
	}
});
$(".lx-popup-image").delegate(".lx-mini-slide-nav > .fa-angle-left","click",function(){
	if(lx_passed == "yes"){
		lx_passed = "no";
		var ul = $(this).parent().parent().find("ul")
		ul.css({"-webkit-transition":"all 0.4s","transition":"all 0.4s","left":"0px"});
		window.setTimeout(function(){
			ul.css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+(ul.find("li").outerWidth())+"px"});
			var item = "<li style='width:"+ul.find("li").outerWidth()+"px;'>"+ul.find("li:last-child").prev(".lx-mini-slide ul li").html()+"</li>";
			ul.prepend(item);
			ul.find("li:last-child").prev(".lx-mini-slide ul li").remove();
			lx_passed = "yes";
		},500);
	}
});

// URI Hash event
$(window).on("hashchange", function() {
    // Redirection to the requested bloc
    hashHistory();
    return false;
});

// Hash event
function hashHistory() {
	
	// Retreive Hash
    var page = "";
    if (window.location.hash) {
        page = document.location.hash;
        page = page.replace(/\#/, "");
    } else {
        page = "home";
    }
    // Remove active class from menus
    $(".lx-main-menu ul li a").removeClass("active");
    // Set clicked menu active
    $(".lx-main-menu ul li a[data-url='" + page + "']").addClass("active");
	// Hide all blocs
	$(".lx-blocs").removeClass("active");
	// Show the correspondant bloc
	$(".lx-"+page).addClass("active");
	// If bloc skills load the progress bars
	if(page === "skills"){
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
            $(".lx-bar:eq(" + i + ") .lx-bar-counter").text($(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
            $(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width", $(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
        }
	}
	else{
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
            $(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
            $(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
        }		
	}
}

// Main menu event : show correspondant section
$(".lx-main-menu ul li a").on("click", function() {

	var patt = /single-post/;
	if(!patt.test(location.pathname)){	
		// Remove active class from menus
		$(".lx-main-menu ul li a").removeClass("active");
		// Set clicked menu active
		$(this).addClass("active");
		// Hide all blocs
		$(".lx-blocs").removeClass("active");
		// Show the correspondant bloc
		$("."+$(this).attr("data-title")).addClass("active");
		// Update the url
		//history.pushState('data', '', $(this).attr("data-url"));
		
		// If bloc skills load the progress bars
		//if($(this).attr("data-title") === "lx-skills"){
			//for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
			//	$(".lx-bar:eq(" + i + ") .lx-bar-counter").text($(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
			//	$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width", $(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
			//}
		//}
		//else{
		//	for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
		//		$(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
		//		$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
		//	}		
		//}
		
		// Responsive Menu Hide
		if($(window).width() <= 768){
			$(".lx-main-menu").css("left", "-120px");
			$(".lx-main-menu > i").attr("class", "lnr lnr-menu");		
		}
	}
});

// Responsive menu event
$(".lx-main-menu > i").on("click", function() {
    if ($(".lx-main-menu").css("left") === "-120px") {
        $(".lx-main-menu").css("left", "0px");
        $(".lx-main-menu > i").attr("class", "lnr lnr-cross");
    } else {
        $(".lx-main-menu").css("left", "-120px");
        $(".lx-main-menu > i").attr("class", "lnr lnr-menu");
    }
    return false;
});

var topMenu = 1;
// Up Down Menu
$(".lx-menu-down").on("click", function() {
	if($(window).height() - topMenu < $(".lx-main-menu ul").height()){
		topMenu = topMenu - 94;
		$(".lx-main-menu ul").css("top",topMenu+"px");
		$(".lx-menu-up").css("display","block");		
	}
	else{
		$(".lx-menu-down").css("display","none");
	}	
	
    return false;
});
$(".lx-menu-up").on("click", function() {
	if($(window).height() + topMenu < $(window).height()){
		topMenu = topMenu + 94;
		$(".lx-main-menu ul").css("top",topMenu+"px");
		$(".lx-menu-down").css("display","block");
	}
	else{
		$(".lx-menu-up").css("display","none");
	}
	
    return false;
});

// Hide window
$(".lx-blocs-head ul li a i.lnr-cross").on("click", function() {
	
	// Remove active class from menus
    $(".lx-main-menu ul li a").removeClass("active");
	$(".lx-main-menu ul li a[data-title='lx-home']").addClass("active");
	
	// Remove active class from the closed bloc
    $(this).parent().parent().parent().parent().parent().removeClass("active");

	history.pushState('data', '', '#home');
	
	// Empty the progress bars if it is the skills bloc
	if($(this).parent().parent().parent().parent().parent().attr("class") === "lx-skills lx-blocs"){
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
            $(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
            $(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
        }
	}
	
	// Contract the form the bloc if it is expanded
	if($(this).parent().parent().parent().find(".lnr-frame-contract").length){
		$(this).parent().parent().parent().find(".lnr-frame-contract").attr("class","lnr lnr-frame-expand");
		$(this).parent().parent().parent().parent().parent().attr("style","");		
	}
		
    return false;
});

// Expand and Contract window
$(".lx-blocs-head ul li a").on("click", function() {
		
	if($(this).find("i").attr("class") === "lnr lnr-frame-expand"){
		$(this).find("i").attr("class","lnr lnr-frame-contract");
		$(this).parent().parent().parent().parent().css({"position":"fixed","z-index":"10","top":"0px","left":"0px","height":"100%"});
		$(this).parent().parent().parent().next("div").css("max-height",($(".lx-wrapper").height()-42)+"px");
	}
	else{
		$(this).find("i").attr("class","lnr lnr-frame-expand");
		$(this).parent().parent().parent().parent().attr("style","");
		if($(window).width() <= 768){
			$(this).parent().parent().parent().next("div").css("max-height",($(".lx-wrapper").height()-42)+"px");
		}
		else{
			$(this).parent().parent().parent().next("div").css("max-height",($(".lx-wrapper").height()-100)+"px");
		}
	}
    return false;
});

// Contact Form Errors
$(".lx-contact form input[type='button']").on("click", function() {
    // Remove all errors
    $(".lx-contact form span").remove();
    $(".lx-contact form input[type='text']").css("border-right", "0px");
    $(".lx-contact form textarea").css("border-right", "0px");
    // Test fullname
    var fullname = $(".lx-contact form input[name='fullname']");
    if (fullname.val() === "") {
        fullname.after("<span>This field must be filled</span>").css("border-right", "3px solid #a94442");
    }
    // Test email
    var email = $(".lx-contact form input[name='email']");
    var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!patt.test(email.val())) {
        email.after("<span>Invalid Email</span>").css("border-right", "3px solid #a94442");
    }
    // Test message
    var txtarea = $(".lx-contact form textarea");
    if (txtarea.val() === "") {
        txtarea.after("<span>This field must be filled</span>").css("border-right", "3px solid #a94442");
    }
	
	if($(".lx-contact form span").length === 0){
		var url = "send-contact-form.php?fullname="+fullname.val()+"&email="+email.val()+"&message="+txtarea.val();
		var posting = $.post( url );
		posting.done(function( data ) {
			$(".lx-contact-saved").html(data);	
			$(".lx-contact form input[name='fullname']").val("");
			$(".lx-contact form input[name='email']").val("");
			$(".lx-contact form textarea").val("");
		});	
	}	
    return false;
});

// Remove email error
$(".lx-contact form input[name='email']").on("keyup", function() {
    var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (patt.test($(this).val())) {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Remove fullname error
$(".lx-contact form input[name='fullname']").on("keyup", function() {
    if ($(this).val() !== "") {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Remove textarea error
$(".lx-contact form textarea").on("keyup", function() {
    if ($(this).val() !== "") {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Comment Form Errors
$(".lx-comments-form input[type='button']").on("click",function(){
	
	$(".lx-comments-form input[type='text']").css("border-color","#FF0000");
	$(".lx-comments-form textarea").css("border-color","#FF0000");
	
	// Test fullname input
	var fullname = $(".lx-comments-form input[name='fullname']");
	if(fullname.val() !== ""){
		fullname.css("border-color","#EEEEEE");
	}
	
	// Test message input
	var txtarea = $(".lx-comments-form textarea");
	if(txtarea.val() !== ""){
		txtarea.css("border-color","#EEEEEE");
	}
	
	return false;
});

// Remove Errors
$(".lx-comments-form input[name='fullname']").on("keyup",function(){
	if($(this).val() !== ""){
		$(this).css("border-color","#EEEEEE");
	}
	
	return false;
});

$(".lx-comments-form textarea").on("keyup",function(){
	if($(this).val() !== ""){
		$(this).css("border-color","#EEEEEE");
	}
	
	return false;
});

// Language Event
$(".lx-lang p").on("click",function(){
	if($(".lx-lang-items ul").css("display") !== "block"){
		$(".lx-lang-items ul").fadeIn();
	}
	else{
		$(".lx-lang-items ul").fadeOut();
	}
	
	return false;
});

// Hide Lang
$("body").on("click", function(e) {
    if (!$(".lx-lang *").is(e.target)) {
        $(".lx-lang-items ul").fadeOut();
    }
});

// Choose Language Event
 $(".lx-lang-items ul li").on("click",function(){
		$(".lx-lang p").html($(this).attr("data-content")+"<i class='fa fa-caret-down'></i>");
		$(".lx-lang-items ul").fadeOut();
	return false;
});