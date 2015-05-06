'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ImmigrationCtrl
 * @description
 * # ImmigrationCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ImmigrationCtrl', function ($scope, $modal) {
    $scope.serviceList = [
    	{
    		link: 'assets/r_citizen.pdf',
    		title: 'Registration of Malaysian Citizens',
    	},
    	{
    		link: 'assets/r_newborn.pdf',
    		title: 'Registration of Newborn Child'
    	},
    	{
    		link: 'assets/r_marriage.pdf',
    		title: 'Registration of Marriage for Non-Muslims'
    	},
    	{
    		link: 'assets/app_goodconduct.pdf',
    		title: 'Application for Certificate of Good Conduct'
    	},
    	{
    		link: 'assets/app_jwaiver.pdf',
    		title: 'Application for Certificate of Waiver of Two Year Home Residence (J1 Waiver)'
    	},
    	{
    		link: 'assets/renunciation.pdf',
    		title: 'Renunciation of Malaysian Citizenship'
    	},
    	{
    		link: 'assets/cert_docs.pdf',
    		title: 'Certification of Malaysian/U.S. Documents'
    	},
    	{
    		link: 'assets/app_newpassport.pdf',
    		title: 'Application for New/Renewal of Malaysian Passport'
    	},
    	{
    		link: 'assets/replace_lostpassport.pdf',
    		title: 'Replacement of Lost Malaysian Passport'
    	},
    	{
    		link: 'assets/replace_dmgpassport.pdf',
    		title: 'Replacement of Damaged Malaysian Passport'
    	},
    	{
    		link: 'assets/cert_emergency.pdf',
    		title: 'Application for Emergency Certificate'
    	}

    ];

    $scope.select = false;
    $scope.selectedService = {};

    $scope.update = function() {
    	$scope.select = true;
    };

    $scope.open_immigration = function (size) {
    	$modal.open({
        templateUrl: 'm_immigration.html',
        controller: 'ImmigrationmodelCtrl',
        size: size,
        resolve: {
        	selectedService: function() {
        		return $scope.selectedService;
        	}
        }

      });

    };

  });
