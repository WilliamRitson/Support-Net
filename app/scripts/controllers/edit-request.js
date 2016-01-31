'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:EditRequestCtrl
 * @description
 * # EditRequestCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
	.controller('EditRequestCtrl', function($scope, $routeParams, $firebaseObject, $firebaseArray, $location, Ref, categories) {
		var orgId = $routeParams.orgId,
			requestId = $routeParams.requestId,
			isNew = requestId === 'new';
		$scope.org = $firebaseObject(Ref.child('organisation').child(orgId));
		$scope.categories = categories.names;

		if (isNew) {
			$scope.request = {
				requester: orgId,
				timestamp: (new Date()).toString(),
				title: '',
				description: '',
				category: $scope.categories[0]
			};
		} else {
			$scope.request = $firebaseObject(Ref.child('request').child(requestId));
		}

		$scope.done = function() {
			if (isNew) {
				$firebaseArray(Ref.child('request')).$add($scope.request).then(function () {
					$location.url('/organisation/' + orgId);
				});
			} else {
				$scope.request.$save();
				$location.url('/organisation/' + orgId);
			}
		};
	});
