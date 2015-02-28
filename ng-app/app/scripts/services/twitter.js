'use strict';

angular.module('midwestApp')
.constant('twitterUrl', 'http://104.131.38.207/api/twitter/1.1/search/tweets.json?q=midwestgames&include_entities=true')
.factory('twitter', function ($http, twitterUrl) {
	var unloadedPosts = [];
	var maxTagId = 0;
	var oldPosts = [];

	var service = {
		requestNewPosts: function(latestId) {
			return $http.get(twitterUrl).then(function(resp) {
				console.log(resp);
				if(resp.data.statuses.length == 0) {
					return;
				}
				if(latestId === 0) {
					console.log(resp);
					unloadedPosts = resp.data.statuses;
					maxTagId = resp.data.statuses[resp.data.statuses.length - 1].id;
					return;
				}
				var refId = unloadedPosts.length > 0 ? unloadedPosts[0].id : latestId;
				for(var i = 0; i < resp.data.statuses.length - 1; i++) {
					if(resp.data.statuses[i].id === refId) {
						unloadedPosts = resp.data.statuses.slice(0, i).concat(unloadedPosts);
						return;
					}
				}
				unloadedPosts = resp.data.statuses.concat(unloadedPosts);
			});
		},

		requestOldPosts: function() {
			return $http.get(twitterUrl + '&max_id=' + maxTagId).then(function(resp) {
				maxTagId = resp.data.statuses[resp.data.statuses.length - 1].id;
				oldPosts = resp.data.statuses;
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
