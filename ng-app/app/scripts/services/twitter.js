'use strict';

angular.module('midwestApp')
.constant('twitterUrl', 'http://104.131.38.207/api/twitter/?count=30')
.factory('twitter', function ($http, twitterUrl) {
	var unloadedPosts = [];
	var maxTagId = 0;
	var oldPosts = [];

	var service = {
		requestNewPosts: function(latestId) {
			return $http.get(twitterUrl).then(function(resp) {
				unloadedPosts = resp.data.statuses;
				console.log(unloadedPosts);
			});
		},

		getOldPosts: function() {
			return oldPosts;
		},

		getUnloadedPosts: function() {
			return unloadedPosts;
		},

		clearUnloadedPosts: function() {
			unloadedPosts = [];
		},

		unloadedPostsLength: function() {
			return unloadedPosts.length;
		}
	};

	return service;
});
