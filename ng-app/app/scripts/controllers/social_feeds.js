'use strict';

angular.module('midwestApp')
	.controller('SocialFeedsCtrl', function($scope, instagram, $interval) {
		var requestNewPosts = function(latestId) {
			return instagram.requestNewPosts(latestId);
		};

		$scope.posts = [];
		$scope.newCount = 0;
		$scope.loadedAllPosts = false;

		$scope.loadNewPosts = function() {
			$scope.posts = instagram.getUnloadedPosts().concat($scope.posts);
			instagram.clearUnloadedPosts();
			$scope.newCount = 0;
		};

		$scope.loadOldPosts = function() {
			instagram.requestOldPosts().then(function() {
				$scope.posts = $scope.posts.concat(instagram.getOldPosts());
			});
		};

		requestNewPosts(0).then(function() {
			$scope.loadNewPosts();
		});
		
		$interval(function() {
			requestNewPosts($scope.posts[0].id).then(function() {
				$scope.newCount = instagram.unloadedPostsLength();
			});
		}, 10000);
	});