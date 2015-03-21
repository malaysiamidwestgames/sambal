'use strict';

angular.module('midwestApp')
.constant('instagramUrl', 'https://api.instagram.com/v1/tags/paleo/media/recent' +
					'?count=30&client_id=2aafa51114a14efda303e22ffa48c6e2&callback=JSON_CALLBACK')
.factory('instagram', function ($http, instagramUrl) {
	var unloadedPosts = [];
	var maxTagId = 0;
	var oldPosts = [];

	var service = {
		requestNewPosts: function(latestId) {
			return $http.jsonp(instagramUrl).then(function(resp) {
				if(latestId === 0) {
					maxTagId = resp.data.pagination.next_max_tag_id;
					unloadedPosts = resp.data.data;
					return 0;
				}
				var refId = unloadedPosts.length > 0 ? unloadedPosts[0].id : latestId;
				for(var i = 0; i < 30; i++) {
					if(resp.data.data[i].id === refId) {
						unloadedPosts = resp.data.data.slice(0, i).concat(unloadedPosts);
						return;
					}
				}
				unloadedPosts = resp.data.data.concat(unloadedPosts);
			});
		},

		requestOldPosts: function() {
			return $http.jsonp(instagramUrl + '&max_tag_id=' + maxTagId).then(function(resp) {
				maxTagId = resp.data.pagination.next_max_tag_id;
				oldPosts = resp.data.data;
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
		},

		loadedAllPosts: function() {
			return maxTagId === undefined;
		}
	};

	return service;
});
