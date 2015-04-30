'use strict';

angular.module('midwestApp')
	.controller('AdminSettingsCtrl', function ($scope, $routeParams, $location, $http, User) {

	  	var options = {};
	  	options['regular'] = 0;
	  	options['admin'] = 1;
	  	options['contingent_leader'] = 2;
	  	options[true] = 0;
	  	options[false] = 1;

	  	$scope.isReady = false;
	  	$scope.authorizationLevels = ['regular', 'admin', 'contingent_leader'];
	  	$scope.paymentStatuses = ['completed', 'pending'];

	  	var user = User.get({ id: $routeParams.userId }, function() {
	  		console.log(user.user);
		  	$scope.selectedAuthorizationLevel = $scope.authorizationLevels[options[user.user.authorization_level]];
		  	$scope.selectedPaymentStatus = $scope.paymentStatuses[options[user.user.registration_payment_status]];
		  	$scope.fullname = user.user.first_name + ' ' + user.user.last_name;

		  	$scope.isReady = true;
	  	});

	  	$scope.update = function() {
			var url = '/api/users/' + $routeParams.userId;
			var userParams = { 
				university: user.user.university.name,
				authorization_level: $scope.selectedAuthorizationLevel
			};

			var paymentCompletedParams = {
				payment_status: 'Completed',
				cmd: '_xclick',
            	business: 'midwestmalaysia@gmail.com',
            	notify_url: 'http://malaysiamidwestgames.com/api/hook',
            	item_name: 'General registration',
            	rm: '1',
            	no_shipping: '1',
            	currency_code: 'USD',
            	amount: '20'
			};

			var paymentInitParams = {
				user_id: $routeParams.userId,
				status: 'Processing payment',
				notification_params: 'nil',
				regtype: 'General registration',
				transaction_id: '0000',
				purchased_at: Date.now()
			};

			if(!user.user.registration_payment_status && $scope.selectedPaymentStatus==='completed') {
				$http.post('/api/payments', paymentInitParams)
			        .success(function(data) {
			        	console.log(data);
			        	paymentCompletedParams.invoice = data.id;
			        	$http.post('/api/hook', paymentCompletedParams)
							.success(function(data) {
								console.log(data);
							});
			        });
			}

			else if(user.user.registration_payment_status && $scope.selectedPaymentStatus==='pending') {
				userParams.payments = 'delete';
			}

	  		$http.put(url, userParams)
	  			.success(function() {
	  				$location.path('/userlist');
	  			});
	  	};

  	});
