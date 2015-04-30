'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:TournamentsCtrl
 * @description
 * # TournamentsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
	.controller('TournamentsCtrl', function($scope, $modal, $http) {
		$scope.data = {
			teams: [
				["Team 1", "Team 2"], /* first matchup */
      			["Team 3", "Team 4"]  /* second matchup */
			],
			results : [
				[[1,2], [3,4]],       /* first round */
      			[[4,6], [2,1]]        /* second round */
			]
		};
});