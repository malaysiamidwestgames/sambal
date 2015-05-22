'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:LuckykitchenCtrl
 * @description
 * # LuckykitchenCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('LuckykitchenCtrl', function ($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [];
    $scope.slides.push({
      image: 'images/LK_Spring Rolls.jpg',
      text: 'Yummy Lucky Kitchen Spring Rolls'
    });
    $scope.slides.push({
      image: 'images/LK_Homestyle Tofu.jpg',
      text: 'Homestyle Tofuuuuuuuuuuuuu!'
    });
    $scope.slides.push({
      image: 'images/LK_Dumplings.jpg',
      text: 'How do you say no this these awesome Lucky Kitchen Dumplings?'
    });
    $scope.slides.push({
      image: 'images/LK_Gen Tso Chicken.jpg',
      text: 'General Tso\'s Chicken'
    });
    $scope.slides.push({
      image: 'images/LK_Tilapia Fish in Brown Sauce.jpg',
      text: 'Best dish in Lucky Kitchen'
    });
  });
