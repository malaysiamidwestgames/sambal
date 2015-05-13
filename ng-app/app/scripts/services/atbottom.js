'use strict';

angular.module('midwestApp')
  .directive('atBottom', function($timeout, $document, $window){
    return {
      restrict: 'A',
      scope: {
        updateBottom: '&'
      },
      compile: function() {
        return function($scope, element) {
          console.log($scope);
          var elm = element[0];
          var check = function() {
             $scope.updateBottom((elm.offsetHeight + elm.scrollTop) >= elm.scrollHeight);
          };
          var appliedCheck = function() {
            $scope.$apply(check);
          };
          element.bind('scroll', appliedCheck);
          check();
          $timeout(check,500);
          angular.element($window).bind('resize', appliedCheck);
        };
      }
    };
  });
