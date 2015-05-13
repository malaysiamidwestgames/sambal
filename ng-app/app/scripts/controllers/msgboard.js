'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('PostsCtrl', function ($scope, $http, $rootScope) {

    var userid = $rootScope.currentUser.id;
    console.log(userid);

    $http
      .get('/api/posts')
      .success(function(data) {
        $scope.posts = data.posts;
        console.log($scope.posts);
      });

    $http
      .get('/api/posts/userlike?user_id=' + userid)
      .success(function(data) {
        $scope.likes = data.posts;
        console.log($scope.likes);
      });

    $scope.postMsg = function(message) {
      $http
        .post('/api/posts', {user_id: userid, message: message})
        .success(function(data) {
          console.log(data);
          $scope.post = '';
          $scope.posts.unshift(data);
        });
    };

    $scope.postComment = function(message, post_id) {
      $http
        .post('/api/comments', {user_id: userid, post_id: post_id, message: message})
        .success(function(data) {
          console.log(data);
        });
    };

    $scope.postLike = function(post_id) {
      $http
        .post('/api/likes', {user_id: userid, post_id: post_id})
        .success(function(data) {
          console.log(data);
        });

      $scope.likes[post_id-1] = true;
    };

    
  });
