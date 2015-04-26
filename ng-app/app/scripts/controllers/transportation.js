'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:TransportationCtrl
 * @description
 * # TransportationCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('TransportationCtrl', function ($scope) {
    $(function(){
 		$(document).on( 'scroll', function(){
 
			if ($(window).scrollTop() > 100) {
				$('.scroll-top-wrapper').addClass('show');
			} else {
				$('.scroll-top-wrapper').removeClass('show');
			}
		});
 
		$('.scroll-top-wrapper').on('click', scrollToTop);
	});
 
	function scrollToTop() {
		verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
		element = $('body');
		offset = element.offset();
		offsetTop = offset.top;
		$('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
	}
	
  });
