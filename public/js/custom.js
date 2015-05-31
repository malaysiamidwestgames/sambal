$(function() {
	var midwest2015Date = new Date(2015, 4, 22);
	var midwest2016Date = new Date(2015, 4, 27);
	var todayDate = new Date();

	var diffInDay = Math.floor((midwest2015Date - todayDate)/(1000 * 60 * 60 * 24));
	var futureDiff = Math.floor((midwest2016Date - todayDate)/(1000 * 60 * 60 * 24));
	var topText = diffInDay;
	var botText = 'days to go';

	if (diffInDay <= 0 && diffInDay >= -2) {
		topText = 'Event happening now!';
		botText = 'Are you here?!';
	} else if (diffInDay < -2) {
		topText = futureDiff;
		botText = 'days to go\nCheck out the winners of MMG 2015 now!'
	}

	$('.countdown .number').text(topText);
	$('.countdown .desc').text(botText);
});