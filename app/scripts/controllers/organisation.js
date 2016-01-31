'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:OrganisationCtrl
 * @description
 * # OrganisationCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
	.controller('OrganisationCtrl', function($scope, $routeParams, $firebaseObject, $firebaseArray, Ref, notifications) {
		$scope.id = $routeParams.id;
		$scope.org = $firebaseObject(Ref.child('organisation').child($routeParams.id));
		$scope.orgRequests = $firebaseArray(Ref.child('request').orderByChild('requester').equalTo($scope.id));
		$scope.orgOffers = $firebaseArray(Ref.child('offer').orderByChild('requester').equalTo($scope.id));

		$scope.users = {};
		$scope.getUserName = function(uid) {
			var user = $scope.users[uid];
			if (user) {
				return user.name;
			} else {
				$scope.users[uid] = $firebaseObject(Ref.child('users').child(uid));
				return 'Loading Name';
			}
		};

		$scope.acceptOffer = function(offer) {
			offer.accepted = true;
			//var request = $scope.orgRequests.find(function(request) {
		  //	return request.$id === offer.request;
			//});
			notifications.notifyUser(offer.offerer, {
				title: 'Offer Accepted',
				icon: 'ok',
				text: 'Your offer to "' + offer.description + '" was acccepted! Please bring the donation to ' + $scope.org.location + '.'
			});
			$scope.orgOffers.$save(offer);
		};

		$scope.closeRequest = function(request) {
			$firebaseArray(Ref.child('offer').orderByChild('request').equalTo(request.$id)).$loaded().then(function (toDelete) {
				toDelete.forEach(function(offer) {
					console.log(offer);
					if (!offer.accepted) {
						notifications.notifyUser(offer.offerer, {
							title: 'Request Closed',
							icon: 'remove-circle',
							text: 'The request titled ' + request.title + ' was closed before your offer was accepted.'
						});
						toDelete.$remove(offer);
					}
				});
				$scope.orgRequests.$remove(request);
			});
		};

		$scope.getId = function(request) {
			return request.$id;
		};
	});
