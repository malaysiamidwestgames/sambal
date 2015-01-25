$(function() {
	var midwestDate = new Date(2015, 4, 22);
	var todayDate = new Date();

	var diffInDay = Math.floor((midwestDate - todayDate)/(1000 * 60 * 60 * 24));
	$('.countdown .number').text(diffInDay);
});