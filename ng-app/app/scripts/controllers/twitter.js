'use strict';

angular.module('midwestApp')
	.controller('TwitterCtrl', function ($scope, $http, twitter, $interval) {
		$scope.posts = [];
		$scope.newCount = 0;
		$scope.loadedAllPosts = false;

		$scope.loadNewPosts = function() {
			$scope.posts = twitter.getUnloadedPosts().concat($scope.posts);
			twitter.clearUnloadedPosts();
			$scope.newCount = 0;
		};

		$scope.loadOldPosts = function() {
			twitter.requestOldPosts().then(function() {
				$scope.posts = $scope.posts.concat(twitter.getOldPosts());
			});
		};

		twitter.requestNewPosts(0).then(function() {
			$scope.loadNewPosts();
		});

		$interval(function() {
			twitter.requestNewPosts($scope.posts[0].id).then(function() {
				$scope.newCount = twitter.unloadedPostsLength();
			});
		}, 12000);
	});
