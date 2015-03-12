'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ActivationCtrl
 * @description
 * # ActivationCtrl
 * Controller of the midwestApp
 */


angular.module('midwestApp')
  .controller('ActivationCtrl', function ($scope, $routeParams, httpWrapper) {
    var req = httpWrapper.patch('/api/account_activations/:token/');
    console.log($routeParams.token);
    console.log($routeParams.email);


    req({token: $routeParams.token, email: $routeParams.email}).
    then(function(resp){
      console.log('success');

      console.log(resp);


      
      $scope.activation = true;      
     

    }, function(resp) {
      console.log('fail :(');

      console.log(resp);

      $scope.activation = false;      
      

    });


});