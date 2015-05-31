$(function() {
	var midwestDate = new Date(2015, 4, 22);
	var todayDate = new Date();

	var diffInDay = Math.floor((midwestDate - todayDate)/(1000 * 60 * 60 * 24));
	var topText = diffInDay;
	var botText = 'days to go';

	if (diffInDay <= 0 && diffInDay >= -2) {
		topText = 'Event happening now!';
		botText = 'Are you here?!';
	} else if (diffInDay < -2) {
		topText = 'Who will be the host of Malaysia Midwest Games 2016?';
		botText = 'Check out the winners of MMG 2015 now!'
	}

	$('.countdown .number').text(topText);
	$('.countdown .desc').text(botText);
});