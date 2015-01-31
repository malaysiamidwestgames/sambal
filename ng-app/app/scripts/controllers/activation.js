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
    var req = httpWrapper.get('/api/account_activations/:token/edit');
    console.log($routeParams.token);
    console.log($routeParams.email);


    req({token: $routeParams.token, email: $routeParams.email}).
    then(function(){
      console.log('success');
    }, function() {
      console.log('fail :(');
    });


});