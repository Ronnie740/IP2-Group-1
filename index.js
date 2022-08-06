document.getElementById("dropdown-1").addEventListener("click", function () {
	document.getElementById("ul-1").classList.toggle("hidden");
});
document.getElementById("dropdown-2").addEventListener("click", function () {
	document.getElementById("ul-2").classList.toggle("hidden");
});

$("#menuIcon").click(function () {
	$("#navSm").toggleClass("hidden");
});
$("#footer-dropdown").click(function () {
	$("#footer-ul").toggleClass("hidden");
});
$("#footer-dropdown-2").click(function () {
	$("#footer-ul-2").toggleClass("hidden");
});
$("#about-dropdown-1").click(function () {
	$("#about-ul-1").toggleClass("hidden");
});
$("#about-dropdown").click(function () {
	$("#about-ul").toggleClass("hidden");
});
$("#about-dropdown-nav").click(function () {
	$("#about-ul-nav").toggleClass("hidden");
});
$("#about-dropdown-2").click(function () {
	$("#about-ul-2").toggleClass("hidden");
});
