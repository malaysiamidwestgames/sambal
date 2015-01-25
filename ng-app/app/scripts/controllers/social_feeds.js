'use strict';

angular.module('midwestApp')
	.controller('SocialFeedsCtrl', function($scope, instagram, $interval) {
		var requestNewPosts = function(latestId) {
			return instagram.requestNewPosts(latestId);
		};

		$scope.pics = [];
		$scope.newCount = 0;
		$scope.loadedAllPosts = false;

		$scope.loadNewPosts = function() {
			$scope.pics = instagram.getUnloadedPosts().concat($scope.pics);
			instagram.clearUnloadedPosts();
			$scope.newCount = 0;
		};

		$scope.loadOldPosts = function() {
			instagram.requestOldPosts().then(function() {
				$scope.pics = $scope.pics.concat(instagram.getOldPosts());
			});
		};

		requestNewPosts(0).then(function() {
			$scope.loadNewPosts();
		});
		
		$interval(function() {
			requestNewPosts($scope.pics[0].id).then(function() {
				$scope.newCount = instagram.unloadedPostsLength();
			});
		}, 5000);
	});