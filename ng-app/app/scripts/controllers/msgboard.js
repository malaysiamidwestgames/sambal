'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:MsgsCtrl
 * @description
 * # MsgsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('MsgsCtrl', function ($scope, $http, $rootScope, $location) {

    $http
      .get('/api/posts')
      .success(function(data) {
        $scope.posts = data.posts;
        console.log($scope.posts);
      });

    $http
      .get('/api/userlike?user_id=' + $rootScope.currentUser.id)
      .success(function(data) {
        $scope.likes = data.posts;
        console.log($scope.likes);
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

    $scope.postLike = function(post_id) {
      $http
        .post('/api/likes', {user_id: $rootScope.currentUser.id, post_id: post_id})
        .success(function(data) {
          console.log(data);
          $scope.likes[post_id] = true;

          $http
            .get('/api/posts')
            .success(function(data) {
              $scope.posts = data.posts;
              console.log($scope.posts);
            });
        });
    };

    $scope.removeLike = function(post_id) {
      $http
        .delete('/api/likes?user_id=' + $rootScope.currentUser.id + '&post_id=' + post_id)
        .success(function(data) {
          console.log(data);
          $scope.likes[post_id] = false;

          $http
            .get('/api/posts')
            .success(function(data) {
              $scope.posts = data.posts;
              console.log($scope.posts);
            });
        });
    };

    $scope.owner = function(user_id) {
      if(user_id === $rootScope.currentUser.id)
        return true;
      else
        return false;
    };
    
    $scope.edit = function(id, mode) {
      $location.path('/msgboard/edit/' + mode + '/' + id);
    };

    $scope.view = function(id) {
      $location.path('/msgboard/post/' + id);
    };

  });

angular.module('midwestApp')
  .controller('PostsCtrl', function($scope, $http, $rootScope, $routeParams, $location) {

    $http
      .get('/api/posts/' + $routeParams.id)
      .success(function(data) {
        $scope.post = data.post;
        console.log($scope.post);
      });

    $http
      .get('/api/likedpost?id=' + $routeParams.id + '&user_id=' + $rootScope.currentUser.id)
      .success(function(data) {
        $scope.like = data;
        console.log($scope.like);
      });

    $scope.owner = function(user_id) {
      if(user_id === $rootScope.currentUser.id)
        return true;
      else
        return false;
    };

    $scope.postLike = function(post_id) {
      $http
        .post('/api/likes', {user_id: $rootScope.currentUser.id, post_id: post_id})
        .success(function(data) {
          console.log(data);
          $scope.like = true;
          console.log($scope.like);

          $http
            .get('/api/posts/' + $routeParams.id)
            .success(function(data) {
              $scope.post = data.post;
              console.log($scope.post);
            });

        });
    };

    $scope.removeLike = function(post_id) {
      $http
        .delete('/api/likes?user_id=' + $rootScope.currentUser.id + '&post_id=' + post_id)
        .success(function(data) {
          console.log(data);
          $scope.like = false;

          $http
            .get('/api/posts/' + $routeParams.id)
            .success(function(data) {
              $scope.post = data.post;
              console.log($scope.post);
            });
        });
    };

    $scope.postComment = function(message, post_id) {
      $http
        .post('/api/comments', {user_id: $rootScope.currentUser.id, post_id: post_id, message: message})
        .success(function(data) {
          console.log(data);
        });
    };

    $scope.edit = function(id, mode) {
      $location.path('/msgboard/edit/' + mode + '/' + id);
    };

  }); 

angular.module('midwestApp')
  .controller('EditPostsCtrl', function($scope, $http, $rootScope, $routeParams, $location) {

    $http
      .get('/api/' + $routeParams.mode + '/' + $routeParams.id)
      .success(function(data) {
        if($routeParams.mode === 'posts') {
          $scope.data = data.post;
          $scope.title = 'Post';
        } else {
          $scope.data = data.comment;
          $scope.title = 'Comment';
        }
        console.log($scope.data);
      });

    $scope.update = function(newmsg) {
      $http
        .put('/api/' + $routeParams.mode + '/' + $routeParams.id, {message: newmsg})
        .success(function(data) {
          console.log(data);
          toastr.success('Successfully updated.');
          $location.path('/msgboard');
        })
        .error(function(data) {
          toastr.error('Update failed. Input field cannot be blank.');
        });
    };

    $scope.delete = function() {
      $http
        .delete('/api/' + $routeParams.mode + '/' + $routeParams.id)
        .success(function(data) {
          console.log('deleted ' + $routeParams.mode);
          toastr.success('Successfully deleted.');
          $location.path('/msgboard');
        });
    };

    $scope.back = function() {
      if($routeParams.mode === 'posts') {
        $location.path('/msgboard');
      } else {
        $location.path('/msgboard/post/' + $scope.data.post_id);
      }
    };

  });
