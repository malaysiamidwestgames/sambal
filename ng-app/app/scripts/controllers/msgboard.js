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

    $http
      .get('/api/posts')
      .success(function(data) {
        $scope.posts = data.posts;
        console.log($scope.posts);
      });

    $scope.postMsg = function(message) {
      $http
        .post('/api/posts', {user_id: $rootScope.currentUser.id, message: message})
        .success(function(data) {
          console.log(data);
          $scope.post = '';
          $scope.posts.unshift(data);
        });
    };
  });
