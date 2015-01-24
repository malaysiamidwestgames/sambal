'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:SocialFeedsCtrl
 * @description
 * # SocialFeedsCtrl
 * Controller of the midwestApp
 */
 
angular.module('midwestApp')
	.constant('instagramUrl', 'https://api.instagram.com/v1/tags/paleo/media/recent' +
		'?count=30&client_id=2aafa51114a14efda303e22ffa48c6e2&callback=JSON_CALLBACK')
	.controller('SocialFeedsCtrl', function($scope, $http, instagramUrl, $interval) {
		var maxTagId = 0;

		var compare = function() {
			if ($scope.pics.length === 0) {
				$scope.pics = $scope.newPics;
				return;
			}
			for (var i = 0; i < 30; i++) {
				if ($scope.newPics[i].id === $scope.pics[0].id) {
					$scope.newPics = $scope.newPics.slice(0, i);
					$scope.newCount = i;
					return;
				}
			}	
		};

		var getPics = function() {
			$http.jsonp(instagramUrl).then(function(resp) {
				$scope.newPics = resp.data.data;
				maxTagId = maxTagId || resp.data.pagination.next_max_tag_id;
				compare();
			});
		};

		$scope.pics = [];

		$scope.loadedAllPosts = false;

		$scope.loadNewPosts = function() {
			$scope.pics = $scope.newPics.concat($scope.pics);
			$scope.newCount = 0;
		};

		$scope.loadOldPosts = function() {
			$http.jsonp(instagramUrl + '&max_tag_id=' + maxTagId).then(function(resp) {
				var oldPics = resp.data.data;
				maxTagId = resp.data.pagination.next_max_tag_id;
				$scope.pics = $scope.pics.concat(oldPics);
				if (maxTagId === undefined) {
					$scope.loadedAllPosts = true;
				}
			});
		};

		getPics();
		$interval(getPics, 1000);
	});