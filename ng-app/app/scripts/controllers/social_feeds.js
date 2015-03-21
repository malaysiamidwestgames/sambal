'use strict';

angular.module('midwestApp')
	.controller('SocialFeedsCtrl', function($scope, instagram, $interval) {
		$scope.posts = [];
		$scope.newCount = 0;
		$scope.loadedAllPosts = true;

		$scope.loadNewPosts = function() {
			$scope.posts = instagram.getUnloadedPosts().concat($scope.posts);
			instagram.clearUnloadedPosts();
			$scope.newCount = 0;
		};

		$scope.loadOldPosts = function() {
			instagram.requestOldPosts().then(function() {
				$scope.posts = $scope.posts.concat(instagram.getOldPosts());
				$scope.loadedAllPosts = instagram.loadedAllPosts();
			});
		};

		instagram.requestNewPosts(0).then(function() {
			$scope.loadNewPosts();
			$scope.loadedAllPosts = false;
		});
		
		var promise = $interval(function() {
			instagram.requestNewPosts($scope.posts[0].id).then(function() {
				$scope.newCount = instagram.unloadedPostsLength();
			});
		}, 5000);

		$scope.$on('$locationChangeStart', function(){
    	$interval.cancel(promise);
		});
	});