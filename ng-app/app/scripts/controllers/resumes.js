'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ResumesCtrl
 * @description
 * # ResumesCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ResumesCtrl', function ($scope, $http) {
    $http.get('/api/resumes')
      .success(function(data) {
        $scope.resumes = data.resumes;
        //$scope.resumes.image_uid = 'assets/resume/development' + data.resumes.image_uid;
        console.log(data.resumes.image_uid)
      });
  });
