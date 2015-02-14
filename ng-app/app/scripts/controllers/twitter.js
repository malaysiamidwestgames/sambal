'use strict';

angular.module('midwestApp')
	.controller('TwitterCtrl', function ($scope, $http, twitter) {

		$scope.posts = [];
		$scope.newCount = 0;
		$scope.loadedAllPosts = false;

		$scope.loadNewPosts = function() {
			$scope.posts = twitter.getUnloadedPosts().concat($scope.posts);
			twitter.clearUnloadedPosts();
			$scope.newCount = 0;
		};

		twitter.requestNewPosts(0).then(function() {
			$scope.loadNewPosts();
		});
	});
