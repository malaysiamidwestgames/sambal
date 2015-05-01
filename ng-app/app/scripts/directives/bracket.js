'use strict';

angular.module('midwestApp')
	.directive('bracket', function() {
		return {
			// directive restricted to be an attribute only
			restrict: 'A',
			replace: false,
			link: function(scope, element, attrs) {
				element.bracket({
					init: scope.data
				});
			}
		};
});