'use strict';




angular.module('midwestApp')
  .controller('PassResetCtrl', function ($scope, $routeParams, httpWrapper) {
    
    var req = httpWrapper.patch('/api/password_resets/:id/');
    console.log($routeParams.token);
    console.log($routeParams.email);

    $scope.changepass = function() {
    req({id: $routeParams.token, email: $routeParams.email, password: $scope.pass1, password_confirmation: $scope.pass2}).
    then(function(resp){
      console.log('success');

      console.log(resp);


      
      $scope.activation = true;      
     

    }, function(resp) {
      console.log('fail :(');

      console.log(resp);

      $scope.activation = false;      
      

    });

  };

/**
    $scope.register = function() {
      $http
        .post('/api/users', {email: $scope.email, password: $scope.pass1, password_confirmation: $scope.pass2, university: $scope.selectedUniversity})
        .success(function(user) {
          console.log(user);
          session.login($scope.email, $scope.pass1)
            .then(function() {
              $location.path('/');
            }, function(req) {
              $scope.errorMessage = req.data.message;
            });
        })
        .error(function(error) {
          console.log('error login in');
          console.log(error);

        });
    };
    */


});